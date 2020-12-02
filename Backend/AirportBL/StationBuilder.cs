using AirportAppCommon.Api;
using AirportAppCommon.Enums;
using AirportAppCommon.EventHandlers;
using AirportAppCommon.Models;
using AirportBL.BlockServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AirportAppBL
{
    public class StationBuilder : IStationBuilder
    {
        public IEnumerable<IControlTowerService> TowerServices { get => towerServices; }
        public IEnumerable<IStationService> StationServices { get => stationServices; }

        private readonly object padlock = new object();
        private List<IControlTowerService> towerServices = new List<IControlTowerService>();
        private List<IStationService> stationServices = new List<IStationService>();


        public void BuildLogicBlocks(IEnumerable<ControlTower> controlTowers, IEnumerable<Station> stations)
        {
            lock (padlock)
            {
                var newControlTowers = controlTowers.Where(ct => towerServices.All(ts => ts.Id != ct.Id));
                var newStations = stations.Where(st => stationServices.All(sts => sts.Id != st.Id));

                foreach (var tower in newControlTowers)
                    towerServices.Add(new ControlTowerService(tower));

                foreach (var station in newStations)
                    stationServices.Add(new StationService(station));
            }
        }
        public void BuildBlocksRelations(IEnumerable<TowerToStationRelation> towerToStationRelations, IEnumerable<StationToStationRelation> stationToStationRelations)
        {
            lock (padlock)
            {
                foreach (var tower in towerServices)
                {
                    tower.LandStations = towerToStationRelations
                        .Where(tr => tr.FromId == tower.Id && tr.Direction == Direction.Landing)
                        .Join(stationServices, tr => tr.ToId, sl => sl.Id, (tr, sl) => sl)
                        .ToList();

                    tower.TakeoffStations = towerToStationRelations
                       .Where(tr => tr.FromId == tower.Id && tr.Direction == Direction.Takeoff)
                       .Join(stationServices, tr => tr.ToId, sl => sl.Id, (tr, sl) => sl)
                       .ToList();
                }
            }

            lock (padlock)
            {
                foreach (var station in stationServices)
                {
                    station.LandStations = stationToStationRelations
                        .Where(tr => tr.FromId == station.Id && tr.Direction == Direction.Landing)
                        .Join(stationServices, tr => tr.ToId, sl => sl.Id, (tr, sl) => sl)
                        .ToList();

                    station.TakeoffStations = stationToStationRelations
                       .Where(tr => tr.FromId == station.Id && tr.Direction == Direction.Takeoff)
                       .Join(stationServices, tr => tr.ToId, sl => sl.Id, (tr, sl) => sl)
                       .ToList();
                }
            }
        }

    }
}
