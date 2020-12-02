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
            return context.Flights;
        }
        public async Task<Flight> SaveNewFlightAsync(Flight flight)
        {
            flight.Id = Guid.NewGuid();
            context.Flights.Add(flight);
            await context.SaveChangesAsync();
            return context.Flights.FirstOrDefault(f => f.Id == flight.Id);
        }

        public IEnumerable<StationLog> GetLogs()
        {
            return context.StationLogs.Include(l => l.Flight);
        }
        public IEnumerable<StationLog> GetLogs(Guid stationId)
        {
            return context.StationLogs.Where(l => l.FromId == stationId || l.ToId == stationId).Include(l=>l.Flight);
        }
        public async Task SaveNewLogAsync(StationLog log)
        {
            log.Id = Guid.NewGuid();
            context.StationLogs.Add(log);
            await context.SaveChangesAsync();
        }

        public IEnumerable<ControlTower> GetControlTowers()
        {
            return context.ControlTowers.Where(ct=>!ct.IsDeleted);
        }
        public async Task<ControlTower> SaveNewControlTowerAsync(ControlTower controlTower)
        {
            controlTower.Id = Guid.NewGuid();
            context.ControlTowers.Add(controlTower);

            await context.SaveChangesAsync();
            return context.ControlTowers.FirstOrDefault(s => s.Id == controlTower.Id);
        }
        public async Task<ControlTower> UpdateControlTowerAsync(Guid controlTowerId, ControlTower controlTower)
        {
            var dbTower = context.ControlTowers.FirstOrDefault(ct => ct.Id == controlTowerId);
            if (dbTower == null) return null;

            dbTower.Name = controlTower.Name;
            await context.SaveChangesAsync();

            return dbTower;
        }
        public async Task<ControlTower> DeleteAirportAsync(Guid controlTowerId)
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

        public IEnumerable<Station> GetStations()
        {
            return context.Stations.Where(s=>!s.IsDeleted);
        }
        public async Task<Station> SaveNewStationAsync(Station station)
        {
            var controlTower = context.ControlTowers.FirstOrDefault(ct => ct.Id == station.ControlTowerId);
            if (controlTower == null) return null;

            station.Id = Guid.NewGuid();
            station.ControlTowerId = station.ControlTowerId;
            context.Stations.Add(station);

            await context.SaveChangesAsync();
            return context.Stations.FirstOrDefault(s => s.Id == station.Id);
        }
        public async Task<Station> UpdateStationAsync(Guid stationId, Station station)
        {
            var dbStation = context.Stations.FirstOrDefault(s => s.Id == stationId);
            if (dbStation == null) return null;

            dbStation.Name = station.Name;

            await context.SaveChangesAsync();
            return dbStation;
        }
        public async Task<Station> DeleteStationAsync(Guid stationId)
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


        public IEnumerable<StationToStationRelation> GetStationToStationRelations()
        {
            return context.StationRelations;
        }
        public IEnumerable<TowerToStationRelation> GetTowerToStationRelations()
        {
            return context.TowerRelations;
        }
        public Task<IRelationDTO> AddConnection(Guid fromId, Guid toId, Direction direction)
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
        public async Task<IRelationDTO> AddConnection(Station from, Station to, Direction direction)
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
        public async Task<IRelationDTO> AddConnection(ControlTower controlTower, Station station, Direction direction)
        {
            var relation = new TowerToStationRelation
            {
                FromId = controlTower.Id,
                ToId = station.Id,
                Direction = direction
            };
            context.TowerRelations.Add(relation);
            await context.SaveChangesAsync();

            return relation;
        }
        public async Task<IRelationDTO> DeleteConnection(Guid fromId, Guid toId, Direction direction)
        {
            var tower = context.ControlTowers.FirstOrDefault(ct => ct.Id == fromId);
            if (tower != null) return await DeleteTowerToStationRelationAsync(fromId, toId, direction);
            return await DeleteStationToStationRelationAsync(fromId, toId, direction);
        }
        public async Task<StationToStationRelation> DeleteStationToStationRelationAsync(Guid fromId, Guid toId, Direction direction)
        {
            var dbRelation = context.StationRelations.FirstOrDefault(sts => sts.FromId == fromId && sts.ToId == toId && sts.Direction == direction);
            if (dbRelation == null) return null;

            context.StationRelations.Remove(dbRelation);
            await context.SaveChangesAsync();
            return dbRelation;
        }
        public async Task<TowerToStationRelation> DeleteTowerToStationRelationAsync(Guid fromId, Guid toId, Direction direction)
        {
            var dbRelation = context.TowerRelations.FirstOrDefault(sts => sts.FromId == fromId && sts.ToId == toId && sts.Direction == direction);
            if (dbRelation == null) return null;

            context.TowerRelations.Remove(dbRelation);
            await context.SaveChangesAsync();
            return dbRelation;
        }

    }
}
