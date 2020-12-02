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
    public class StationService : IStationService
    {
        public Guid Id => station.Id;
        public Guid ControlTowerId => station.ControlTowerId;
        public IPlaneService Plane { get; private set; }
        public bool IsOccupied => Plane != null;
        public IEnumerable<IStationService> TakeoffStations { get; set; }
        public IEnumerable<IStationService> LandStations { get; set; }

        public event EventHandler<PlaneSendedEventArgs> PlaneSended;

        private readonly object padlock;
        private readonly IStationDTO station;

        public StationService(IStationDTO station)
        {
            padlock = new object();
            TakeoffStations = new List<IStationService>();
            LandStations = new List<IStationService>();

            if (Plane != null)
            {
                Plane.ReadyToCotinue += Plane_ReadyToCotinue;
                Plane.StartWatingAtStation();
            }

            this.station = station;
        }

        public bool PlaneArrived(IPlaneService plane)
        {
            lock (padlock)
            {
                if (IsOccupied || plane == null) return false;
                Plane = plane;
                plane.ReadyToCotinue += Plane_ReadyToCotinue;
                plane.StartWatingAtStation();
                return true;
            }
        }

        private void Plane_ReadyToCotinue(IPlaneService sender, EventArgs e)
        {
            Plane.ReadyToCotinue -= Plane_ReadyToCotinue;

            if (sender.Direction == Direction.Landing)
                SendToNextStation(LandStations);
            else if (sender.Direction == Direction.Takeoff)
                SendToNextStation(TakeoffStations);
        }

        private void SendToNextStation(IEnumerable<IStationService> stations)
        {
            if (stations.Count() == 0)
            {
                CleanUp(null);
                return;
            }

            var availableStation = stations.FirstOrDefault(s => !s.IsOccupied);

            if (availableStation != null && availableStation.PlaneArrived(Plane))
                CleanUp(availableStation);
            else
            {
                foreach (var s in stations)
                    s.PlaneSended += Station_PlaneSended;
            }

        }

        private void Station_PlaneSended(object sender, PlaneSendedEventArgs e)
        {
            lock (padlock)
            {
                if (Plane != null && e.SendedFrom.PlaneArrived(Plane))
                    CleanUp(e.SendedFrom);
            }
        }


        private void CleanUp(IStationService sendedTo)
        {
            if (Plane.Direction == Direction.Landing)
                foreach (var s in LandStations) s.PlaneSended -= Station_PlaneSended;
            else if (Plane.Direction == Direction.Takeoff)
                foreach (var s in TakeoffStations) s.PlaneSended -= Station_PlaneSended;
            var eventArgs = new PlaneSendedEventArgs(Plane, sendedTo, this);
            Plane = null;
            PlaneSended?.Invoke(this, eventArgs);
        }

    }
}
