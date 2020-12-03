using AirportAppCommon.Api.DTOInterfaces;
using AirportAppCommon.Enums;
using AirportAppCommon.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AirportAppCommon.Api
{
    public interface IAirportRepository
    {
        IEnumerable<Flight> GetFlights();
        Task<Flight> SaveNewFlightAsync(Flight flight);

        IEnumerable<StationLog> GetLogs();
        IEnumerable<StationLog> GetLogs(Guid stationId);
        Task<bool> SaveNewLogAsync(StationLog log);

        IEnumerable<ControlTower> GetControlTowers();
        Task<ControlTower> SaveNewControlTowerAsync(ControlTower controlTower);
        Task<ControlTower> UpdateControlTowerAsync(Guid controlTowerId, ControlTower controlTower);
        Task<ControlTower> DeleteAirportAsync(Guid controlTowerId);

        IEnumerable<Station> GetStations();
        Task<Station> SaveNewStationAsync(Station station);
        Task<Station> UpdateStationAsync(Guid stationId, Station station);
        Task<Station> DeleteStationAsync(Guid stationId);

        IEnumerable<StationToStationRelation> GetStationToStationRelations();
        IEnumerable<TowerToStationRelation> GetTowerToStationRelations();
        Task<IRelationDTO> AddConnection(Guid fromId, Guid toId, Direction direction);
        Task<IRelationDTO> DeleteConnection(Guid fromId, Guid toId, Direction direction);
    }
}
