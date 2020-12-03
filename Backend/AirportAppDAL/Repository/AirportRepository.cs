using AirportAppCommon.Api;
using AirportAppCommon.Api.DTOInterfaces;
using AirportAppCommon.Enums;
using AirportAppCommon.Models;
using AirportAppDAL.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirportAppDAL.Repository
{
    public class AirportRepository : IAirportRepository
    {
        private readonly AirportContext context;

        public AirportRepository(AirportContext context)
        {
            this.context = context;
        }

        public IEnumerable<Flight> GetFlights()
        {
            try
            {
                return context.Flights;
            }
            catch (Exception) { return null; }
        }
        public async Task<Flight> SaveNewFlightAsync(Flight flight)
        {
            try
            {
                flight.Id = Guid.NewGuid();
                context.Flights.Add(flight);
                await context.SaveChangesAsync();
                return context.Flights.FirstOrDefault(f => f.Id == flight.Id);
            }
            catch (Exception) { return null; }
        }

        public IEnumerable<StationLog> GetLogs()
        {
            try
            {
                return context.StationLogs.Include(l => l.Flight);
            }
            catch (Exception) { return null; }
        }
        public IEnumerable<StationLog> GetLogs(Guid stationId)
        {
            try
            {
                return context.StationLogs.Where(l => l.FromId == stationId || l.ToId == stationId).Include(l => l.Flight);
            }
            catch (Exception) { return null; }
        }
        public async Task<bool> SaveNewLogAsync(StationLog log)
        {
            try
            {
                log.Id = Guid.NewGuid();
                context.StationLogs.Add(log);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception) { return false; }
        }

        public IEnumerable<ControlTower> GetControlTowers()
        {
            try
            {
                return context.ControlTowers.Where(ct => !ct.IsDeleted);
            }
            catch (Exception) { return null; }
        }
        public async Task<ControlTower> SaveNewControlTowerAsync(ControlTower controlTower)
        {
            try
            {
                controlTower.Id = Guid.NewGuid();
                context.ControlTowers.Add(controlTower);

                await context.SaveChangesAsync();
                return context.ControlTowers.FirstOrDefault(s => s.Id == controlTower.Id);
            }
            catch (Exception) { return null; }
        }
        public async Task<ControlTower> UpdateControlTowerAsync(Guid controlTowerId, ControlTower controlTower)
        {
            try
            {
                var dbTower = context.ControlTowers.FirstOrDefault(ct => ct.Id == controlTowerId);
                if (dbTower == null) return null;

                dbTower.Name = controlTower.Name;
                await context.SaveChangesAsync();

                return dbTower;
            }
            catch (Exception) { return null; }
        }
        public async Task<ControlTower> DeleteAirportAsync(Guid controlTowerId)
        {
            try
            {
                var dbTower = context.ControlTowers.FirstOrDefault(ct => ct.Id == controlTowerId);
                if (dbTower == null) return null;

                var stationToStationRelations = context.StationRelations.Where(sr => sr.From.ControlTowerId == controlTowerId || sr.To.ControlTowerId == controlTowerId);
                context.StationRelations.RemoveRange(stationToStationRelations);

                var towerToStationRelations = context.TowerRelations.Where(tr => tr.FromId == controlTowerId);
                context.TowerRelations.RemoveRange(towerToStationRelations);

                var controlTowerStations = context.Stations.Where(s => s.ControlTowerId == controlTowerId);
                foreach (var station in controlTowerStations)
                    station.IsDeleted = true;

                dbTower.IsDeleted = true;

                await context.SaveChangesAsync();
                return dbTower;
            }
            catch (Exception) { return null; }
        }

        public IEnumerable<Station> GetStations()
        {
            try
            {
                return context.Stations.Where(s => !s.IsDeleted);
            }
            catch (Exception) { return null; }
        }
        public async Task<Station> SaveNewStationAsync(Station station)
        {
            try
            {
                var controlTower = context.ControlTowers.FirstOrDefault(ct => ct.Id == station.ControlTowerId);
                if (controlTower == null) return null;

                station.Id = Guid.NewGuid();
                station.ControlTowerId = station.ControlTowerId;
                context.Stations.Add(station);

                await context.SaveChangesAsync();
                return context.Stations.FirstOrDefault(s => s.Id == station.Id);
            }
            catch (Exception) { return null; }
        }
        public async Task<Station> UpdateStationAsync(Guid stationId, Station station)
        {
            try
            {
                var dbStation = context.Stations.FirstOrDefault(s => s.Id == stationId);
                if (dbStation == null) return null;

                dbStation.Name = station.Name;

                await context.SaveChangesAsync();
                return dbStation;
            }
            catch (Exception) { return null; }
        }
        public async Task<Station> DeleteStationAsync(Guid stationId)
        {
            try
            {
                var dbStation = context.Stations.FirstOrDefault(s => s.Id == stationId);
                if (dbStation == null) return null;

                var stationToStationRelations = context.StationRelations.Where(sr => sr.FromId == stationId || sr.ToId == stationId);
                context.StationRelations.RemoveRange(stationToStationRelations);

                var towerToStationRelations = context.TowerRelations.Where(tr => tr.ToId == stationId);
                context.TowerRelations.RemoveRange(towerToStationRelations);

                dbStation.IsDeleted = true;

                await context.SaveChangesAsync();
                return dbStation;
            }
            catch (Exception) { return null; }
        }


        public IEnumerable<StationToStationRelation> GetStationToStationRelations()
        {
            try
            {
                return context.StationRelations;
            }
            catch (Exception) { return null; }
        }
        public IEnumerable<TowerToStationRelation> GetTowerToStationRelations()
        {
            try
            {
                return context.TowerRelations;
            }
            catch (Exception) { return null; }
        }
        public Task<IRelationDTO> AddConnection(Guid fromId, Guid toId, Direction direction)
        {
            try
            {
                var controlTower = context.ControlTowers.FirstOrDefault(ct => ct.Id == fromId);
                var station1 = context.Stations.FirstOrDefault(s => s.Id == toId);
                if (controlTower != null && station1 != null)
                    return AddConnection(controlTower, station1, direction);

                if (station1 == null) return null;

                var station2 = context.Stations.FirstOrDefault(s => s.Id == fromId);
                if (station2 != null) return AddConnection(station2, station1, direction);

                return null;
            }
            catch (Exception) { return null; }
        }
        public async Task<IRelationDTO> AddConnection(Station from, Station to, Direction direction)
        {
            try
            {
                var relation = new StationToStationRelation
                {
                    FromId = from.Id,
                    ToId = to.Id,
                    Direction = direction
                };
                context.StationRelations.Add(relation);
                await context.SaveChangesAsync();

                return relation;
            }
            catch (Exception) { return null; }
        }
        public async Task<IRelationDTO> AddConnection(ControlTower controlTower, Station station, Direction direction)
        {
            try
            {
                var relation = new TowerToStationRelation { FromId = controlTower.Id, ToId = station.Id, Direction = direction };
                context.TowerRelations.Add(relation);
                await context.SaveChangesAsync();
                return relation;
            }
            catch (Exception) { return null; }
        }
        public async Task<IRelationDTO> DeleteConnection(Guid fromId, Guid toId, Direction direction)
        {
            try
            {
                var tower = context.ControlTowers.FirstOrDefault(ct => ct.Id == fromId);
                if (tower != null) return await DeleteTowerToStationRelationAsync(fromId, toId, direction);
                return await DeleteStationToStationRelationAsync(fromId, toId, direction);
            }
            catch (Exception) { return null; }
        }
        public async Task<StationToStationRelation> DeleteStationToStationRelationAsync(Guid fromId, Guid toId, Direction direction)
        {
            try
            {
                var dbRelation = context.StationRelations.FirstOrDefault(sts => sts.FromId == fromId && sts.ToId == toId && sts.Direction == direction);
                if (dbRelation == null)
                    return null;
                context.StationRelations.Remove(dbRelation);
                await context.SaveChangesAsync();
                return dbRelation;
            }
            catch (Exception) { return null; }
        }
        public async Task<TowerToStationRelation> DeleteTowerToStationRelationAsync(Guid fromId, Guid toId, Direction direction)
        {
            try
            {
                var dbRelation = context.TowerRelations.FirstOrDefault(sts => sts.FromId == fromId && sts.ToId == toId && sts.Direction == direction);
                if (dbRelation == null)
                    return null;
                context.TowerRelations.Remove(dbRelation);
                await context.SaveChangesAsync();
                return dbRelation;
            }
            catch (Exception) { return null; }
        }

    }
}
