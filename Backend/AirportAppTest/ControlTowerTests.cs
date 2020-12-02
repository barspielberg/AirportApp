using AirportAppCommon.Api;
using AirportAppCommon.Enums;
using AirportAppCommon.Models;
using AirportAppTest.Mocks;
using AirportBL.BlockServices;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace AirportAppTest
{
    public class ControlTowerTests
    {
        [Fact]
        public void LandingPlaneShoudSendToCurrectStation()
        {
            IControlTowerService towerService = new ControlTowerService(new ControlTower());

            IStationService landingStation = new StationService(new Station());
            IStationService TakeOffStation = new StationService(new Station());

            towerService.LandStations = new IStationService[] { landingStation };
            towerService.TakeoffStations = new IStationService[] { TakeOffStation };

            IPlaneService landingPlane = new MockPlane { Direction = Direction.Landing };

            towerService.PlaneArrived(landingPlane);

            Assert.Equal(landingStation.Plane, landingPlane);
            Assert.Null(TakeOffStation.Plane);
        }

        [Fact]
        public void TakeOffPlaneShoudSendToCurrectStation()
        {
            IControlTowerService towerService = new ControlTowerService(new ControlTower());

            IStationService landingStation = new StationService(new Station());
            IStationService TakeOffStation = new StationService(new Station());

            towerService.LandStations = new IStationService[] { landingStation };
            towerService.TakeoffStations = new IStationService[] { TakeOffStation };

            IPlaneService takeOffPlane = new MockPlane { Direction = Direction.Takeoff };

            towerService.PlaneArrived(takeOffPlane);

            Assert.Equal(TakeOffStation.Plane, takeOffPlane);
            Assert.Null(landingStation.Plane);
        }

        [Fact]
        public void LandingPlane_WaitForStationAvailable()
        {
            IControlTowerService towerService = new ControlTowerService(new ControlTower());

            IStationService station1 = new StationService(new Station());
            IStationService station2 = new StationService(new Station());

            towerService.LandStations = new IStationService[] { station1 };
            station1.LandStations = new IStationService[] { station2 };

            var plane1 = new MockPlane { Direction = Direction.Landing };
            var plane2 = new MockPlane { Direction = Direction.Landing };

            towerService.PlaneArrived(plane1);
            towerService.PlaneArrived(plane2);

            Assert.Equal(station1.Plane, plane1);

            plane1.StopWating();

            Assert.Equal(station2.Plane, plane1);
            Assert.Equal(station1.Plane, plane2);
        }

        [Fact]
        public void TakrOffPlane_WaitForStationAvailable()
        {
            IControlTowerService towerService = new ControlTowerService(new ControlTower());

            IStationService station1 = new StationService(new Station());
            IStationService station2 = new StationService(new Station());

            towerService.TakeoffStations = new IStationService[] { station1 };
            station1.TakeoffStations = new IStationService[] { station2 };

            var plane1 = new MockPlane { Direction = Direction.Takeoff };
            var plane2 = new MockPlane { Direction = Direction.Takeoff };

            towerService.PlaneArrived(plane1);
            towerService.PlaneArrived(plane2);

            Assert.Equal(station1.Plane, plane1);

            plane1.StopWating();

            Assert.Equal(station2.Plane, plane1);
            Assert.Equal(station1.Plane, plane2);
        }

        [Fact]
        public void StationAvialable_NoWaitingPlanes()
        {
            IControlTowerService towerService = new ControlTowerService(new ControlTower());

            IStationService station1 = new StationService(new Station());
            towerService.TakeoffStations = new IStationService[] { station1 };

            var plane1 = new MockPlane { Direction = Direction.Takeoff };

            towerService.PlaneArrived(plane1);

            Assert.Equal(station1.Plane, plane1);

            plane1.StopWating();

            Assert.False(station1.IsOccupied);
        }
        [Fact]
        public void TwoStationAvialableAtTheSameTime()
        {
            IControlTowerService towerService = new ControlTowerService(new ControlTower());

            IStationService station1 = new StationService(new Station());
            IStationService station2 = new StationService(new Station());
            towerService.TakeoffStations = new IStationService[] { station1, station2 };

            var plane1 = new MockPlane { Direction = Direction.Takeoff, Name = "1" };
            var plane2 = new MockPlane { Direction = Direction.Takeoff, Name = "2" };
            var plane3 = new MockPlane { Direction = Direction.Takeoff, Name = "3" };

            Assert.True(station1.PlaneArrived(plane1));
            Assert.True(station2.PlaneArrived(plane2));

            Assert.True(towerService.PlaneArrived(plane3));

            Parallel.Invoke(
                  () => { plane1.StopWating(); },
                  () => { plane2.StopWating(); });

            Assert.NotEqual(station1.Plane, station2.Plane);
            Assert.True(station1.Plane == plane3 ^ station2.Plane == plane3);
        }
    }
}
