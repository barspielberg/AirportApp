using AirportAppCommon.Api;
using AirportAppCommon.Api.DTOInterfaces;
using AirportAppCommon.Enums;
using AirportAppCommon.EventHandlers;
using AirportAppCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AirportBL.BlockServices
{
    public class ControlTowerService : IControlTowerService
    {
        public Guid Id => controlTower.Id;

        public event EventHandler<PlaneSendedEventArgs> PlaneSended;
        public IEnumerable<IStationService> TakeoffStations
        {
            get => takeoffStations; set
            {
                foreach (var s in value)
                    s.PlaneSended += TakeoffStation_Available;
                takeoffStations = value;

            }
        }
        public IEnumerable<IStationService> LandStations
        {
            get => landStations; set
            {
                foreach (var s in value)
                    s.PlaneSended += LandStation_Available;
                landStations = value;
            }
        }
        public Queue<IPlaneService> PlanesWaitingForLanding { get; set; }
        public Queue<IPlaneService> PlanesWaitingForTakeoff { get; set; }


        private readonly IControlTowerDTO controlTower;
        private IEnumerable<IStationService> takeoffStations;
        private IEnumerable<IStationService> landStations;
        private readonly object padlock = new object();

        public ControlTowerService(IControlTowerDTO controlTower)
        {
            this.controlTower = controlTower;
            PlanesWaitingForLanding = new Queue<IPlaneService>();
            PlanesWaitingForTakeoff = new Queue<IPlaneService>();
            TakeoffStations = new List<IStationService>();
            LandStations = new List<IStationService>();
        }

        public bool PlaneArrived(IPlaneService plane)
        {
            if (plane == null) return false;

            if (plane.Direction == Direction.Landing)
                AddPlane(plane, PlanesWaitingForLanding, LandStations);
            else if (plane.Direction == Direction.Takeoff)
                AddPlane(plane, PlanesWaitingForTakeoff, TakeoffStations);

            return true;
        }

        private void AddPlane(IPlaneService plane, Queue<IPlaneService> waitingPlanes, IEnumerable<IStationService> stations)
        {
            if (waitingPlanes.Count <= 0)
            {
                var availableStation = stations.FirstOrDefault(s => !s.IsOccupied);
                if (availableStation != null && availableStation.PlaneArrived(plane))
                    PlaneSended?.Invoke(this, new PlaneSendedEventArgs(plane, availableStation, null));
                else
                    waitingPlanes.Enqueue(plane);
            }
            else
                waitingPlanes.Enqueue(plane);
        }

        private void LandStation_Available(object sender, PlaneSendedEventArgs e)
            => SendWaitingPlaneToStation(e.SendedFrom, PlanesWaitingForLanding);

        private void TakeoffStation_Available(object sender, PlaneSendedEventArgs e)
            => SendWaitingPlaneToStation(e.SendedFrom, PlanesWaitingForTakeoff);

        private void SendWaitingPlaneToStation(IStationService station, Queue<IPlaneService> WaitingPlanes)
        {
            lock (padlock)
            {
                if (WaitingPlanes.Count <= 0) return;

                var plane = WaitingPlanes.Peek();
                if (plane != null && station.PlaneArrived(plane))
                {
                    plane = WaitingPlanes.Dequeue();
                    PlaneSended?.Invoke(this, new PlaneSendedEventArgs(plane, station, null));
                }
            }
        }


    }
}
