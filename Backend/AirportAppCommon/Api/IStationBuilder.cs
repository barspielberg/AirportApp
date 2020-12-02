using AirportAppCommon.EventHandlers;
using AirportAppCommon.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.Api
{
    /// <summary>
    /// builds the control towers, stations and the connections between them.
    /// maintains the system from overriding stations on every request
    /// </summary>
    public interface IStationBuilder
    {
        IEnumerable<IControlTowerService> TowerServices { get; }
        IEnumerable<IStationService> StationServices { get; }

        void BuildLogicBlocks(IEnumerable<ControlTower> controlTowers, IEnumerable<Station> stations);
        void BuildBlocksRelations(IEnumerable<TowerToStationRelation> towerToStationRelations, IEnumerable<StationToStationRelation> stationToStationRelations);
    }
}
