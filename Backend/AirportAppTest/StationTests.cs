using AirportAppCommon.Api;
using AirportAppCommon.Enums;
using AirportAppCommon.Models;
using AirportAppTest.Mocks;
using AirportBL.BlockServices;
using System;
using System.Threading.Tasks;
using Xunit;

namespace AirportAppTest
{
    public class StationTests
    {
        [Fact]
        public void StationNotAvailable_PlaneShouldNotAccepted()
        {
            IStationService station = new StationService(new Station());
            var plane = new MockPlane();

            Assert.True(station.PlaneArrived(plane));
            Assert.False(station.PlaneArrived(plane));
        }

        [Fact]
        public void StationAvailable_PlaneShouldAccepted()
        {
            IStationService station1 = new StationService(new Station());
            IStationService station2 = new StationService(new Station());
            station1.LandStations = new IStationService[] { station2 };
            var plane = new MockPlane { Direction = Direction.Landing };

            Assert.True(station1.PlaneArrived(plane));

            plane.StopWating();

            Assert.False(station1.IsOccupied);
            Assert.Equal(station2.Plane, plane);
        }

        [Fact]
        public void PlaneStayAtStationIfNoAvailable()
        {
            IStationService station1 = new StationService(new Station());
            IStationService station2 = new StationService(new Station());
            station1.LandStations = new IStationService[] { station2 };
            var plane1 = new MockPlane { Direction = Direction.Landing };
            var plane2 = new MockPlane { Direction = Direction.Landing };

            Assert.True(station1.PlaneArrived(plane1));
            Assert.True(station2.PlaneArrived(plane2));

            plane1.StopWating();

            Assert.True(station1.IsOccupied);
            Assert.NotEqual(station2.Plane, plane1);
        }

        [Fact]
        public void StationShouldBeAvailableIfItsLast()
        {
            IStationService station1 = new StationService(new Station());
            var plane1 = new MockPlane { Direction = Direction.Landing };

            Assert.True(station1.PlaneArrived(plane1));

            plane1.StopWating();

            Assert.False(station1.IsOccupied);
        }

        [Fact]
        public void PlaneStayAtStationIfNoAvailableAndMoveIfIs()
        {
            IStationService station1 = new StationService(new Station());
            IStationService station2 = new StationService(new Station());
            station1.LandStations = new IStationService[] { station2 };
            var plane1 = new MockPlane { Direction = Direction.Landing };
            var plane2 = new MockPlane { Direction = Direction.Landing };

            Assert.True(station1.PlaneArrived(plane1));
            Assert.True(station2.PlaneArrived(plane2));

            plane1.StopWating();

            Assert.True(station1.IsOccupied);

            plane2.StopWating();

            Assert.False(station1.IsOccupied);
            Assert.True(station2.IsOccupied);

            Assert.Equal(station2.Plane, plane1);
        }

        [Fact]
        public void LandingPlaneForLanding_TakeoffPlaneForTakeoff()
        {
            IStationService station1 = new StationService(new Station());
            IStationService landStation = new StationService(new Station());
            IStationService takeoffStation = new StationService(new Station());
            station1.LandStations = new IStationService[] { landStation };
            station1.TakeoffStations = new IStationService[] { takeoffStation };
            var landingPlane = new MockPlane { Direction = Direction.Landing };
            var takeoffPlane = new MockPlane { Direction = Direction.Takeoff };

            Assert.True(station1.PlaneArrived(landingPlane));
            landingPlane.StopWating();

            Assert.True(station1.PlaneArrived(takeoffPlane));
            takeoffPlane.StopWating();


            Assert.False(station1.IsOccupied);

            Assert.Equal(landStation.Plane, landingPlane);
            Assert.Equal(takeoffStation.Plane, takeoffPlane);
        }

        [Fact]
        public void TakeoffPlaneForTakeoff_NotForLanding()
        {
            IStationService station1 = new StationService(new Station());
            IStationService landStation = new StationService(new Station());
            IStationService takeoffStation = new StationService(new Station());
            station1.LandStations = new IStationService[] { landStation };
            station1.TakeoffStations = new IStationService[] { takeoffStation };
            var takeoffPlane = new MockPlane { Direction = Direction.Takeoff };
            var waitingPlane = new MockPlane();

            Assert.True(takeoffStation.PlaneArrived(waitingPlane));

            Assert.True(station1.PlaneArrived(takeoffPlane));
            takeoffPlane.StopWating();


            Assert.True(station1.IsOccupied);
            Assert.False(landStation.IsOccupied);
            Assert.Equal(takeoffStation.Plane, waitingPlane);
        }

        [Fact]
        public void TwoStationAvialableAtTheSameTime()
        {

            IStationService station1 = new StationService(new Station());
            IStationService station2 = new StationService(new Station());
            IStationService station3 = new StationService(new Station());

            station1.TakeoffStations = new IStationService[] { station2, station3 };

            var plane1 = new MockPlane { Direction = Direction.Takeoff, Name = "1" };
            var plane2 = new MockPlane { Direction = Direction.Takeoff, Name = "2" };
            var plane3 = new MockPlane { Direction = Direction.Takeoff, Name = "3" };

            Assert.True(station2.PlaneArrived(plane2));
            Assert.True(station3.PlaneArrived(plane3));

            Assert.True(station1.PlaneArrived(plane1));
            plane1.StopWating();

            Parallel.Invoke(
                  () => { plane2.StopWating(); },
                  () => { plane3.StopWating(); });

            Assert.NotEqual(station2.Plane, station3.Plane);
            Assert.True(station2.Plane == plane1 ^ station3.Plane == plane1);
        }

    }
}
