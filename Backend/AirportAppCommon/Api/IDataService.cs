using AirportAppCommon.Api.DTOInterfaces;
using AirportAppCommon.DTO;
using AirportAppCommon.EventHandlers;
using AirportAppCommon.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AirportAppCommon.Api
{
    /// <summary>
    /// manage data transfer.
    /// the main service of the business layer
    /// </summary>
    public interface IDataService
    {
        Task<bool> AddNewFlightAsync(IFlightDTO flight);
        IEnumerable<ControlTower> GetControlTowers();
        IEnumerable<IStationDTO> GetStationsForControlTower(Guid controlTowerId);
        IEnumerable<IRelationDTO> GetRelationsForControlTower(Guid controlTowerId);
        /// <summary>
        /// get all flights that currently in the airport
        /// </summary>
        /// <param name="controlTowerId"></param>
        /// <returns></returns>
        IEnumerable<ActiveFlightDTO> GetActiveFlightsForControlTower(Guid controlTowerId);
        /// <summary>
        /// get all the flights that in the database but still didn't enter the airport
        /// </summary>
        /// <param name="controlTowerId"></param>
        /// <returns></returns>
        IEnumerable<Flight> GetUnfulfilledFlightsForControlTower(Guid controlTowerId);

        Task<ControlTower> UpdateControlTowerAsync(Guid controlTowerId, ControlTower controlTower);
        Task<ControlTower> AddNewControlTowerAsync(ControlTower controlTower);
        Task<ControlTower> DeleteControlTowerAsync(Guid controlTowerId);

        Task<IStationDTO> UpdateStationAsync(Guid stationId, Station station);
        Task<IStationDTO> AddNewStationAsync(Station station);
        Task<IStationDTO> DeleteStationAsync(Guid stationId);

        Task<IRelationDTO> AddNewRelationAsync(IRelationDTO relation);
        Task<IRelationDTO> DeleteRelationAsync(IRelationDTO relation);

        /// <summary>
        /// get the airport history
        /// </summary>
        /// <param name="stationId"></param>
        /// <returns></returns>
        IEnumerable<StationLog> GetStationLogs(Guid stationId);
    }
}
