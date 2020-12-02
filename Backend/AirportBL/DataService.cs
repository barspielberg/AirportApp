using AirportAppCommon.Api;
using AirportAppCommon.Api.DTOInterfaces;
using AirportAppCommon.DTO;
using AirportAppCommon.Enums;
using AirportAppCommon.EventHandlers;
using AirportAppCommon.Models;
using AirportBL.BlockServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirportAppBL
{
    public class DataService : IDataService
    {
        private readonly IAirportRepository repository;
        private readonly IStationBuilder stationsBuilder;
        private readonly INotificationService notificationService;
        private readonly INotifier notifier;
        private IEnumerable<IControlTowerService> towerServices;

        private static bool firstLoading = true;

        public DataService(IAirportRepository repository,
            IStationBuilder relationsBuilder,
            INotificationService notificationService,
            INotifier notifier)
        {
            this.repository = repository;
            this.stationsBuilder = relationsBuilder;
            this.notificationService = notificationService;
            this.notifier = notifier;
            BuildSystemRelationsAsync();

            if (firstLoading)
            {
                firstLoading = false;
                GetOnTrackFlightsAndSendThem();

                foreach (var flight in GetUnfulfilledFlights()) { SendFlightToControlTower(flight); }
            }

        }

        private async void BuildSystemRelationsAsync()
        {
            await BuildDefaultRoutesIfEmpty();

            stationsBuilder.BuildLogicBlocks(repository.GetControlTowers(), repository.GetStations());
            stationsBuilder.BuildBlocksRelations(repository.GetTowerToStationRelations(), repository.GetStationToStationRelations());
            towerServices = stationsBuilder.TowerServices;

            notificationService.SetServicesForNotification(stationsBuilder.TowerServices);
            notificationService.SetServicesForNotification(stationsBuilder.StationServices);
        }

        private async Task BuildDefaultRoutesIfEmpty()
        {
            var controlTowers = repository.GetControlTowers();
            if (controlTowers.Count() <= 0)
            {
                var tower = await repository.SaveNewControlTowerAsync(new ControlTower { Name = "TLV" });
                var s1 = await repository.SaveNewStationAsync(new Station { Name = "1", ControlTowerId = tower.Id });
                var s2 = await repository.SaveNewStationAsync(new Station { Name = "2", ControlTowerId = tower.Id });
                var s3 = await repository.SaveNewStationAsync(new Station { Name = "3", ControlTowerId = tower.Id });
                var s4 = await repository.SaveNewStationAsync(new Station { Name = "4", ControlTowerId = tower.Id });
                var s5 = await repository.SaveNewStationAsync(new Station { Name = "5", ControlTowerId = tower.Id });
                var s6 = await repository.SaveNewStationAsync(new Station { Name = "6", ControlTowerId = tower.Id });
                var s7 = await repository.SaveNewStationAsync(new Station { Name = "7", ControlTowerId = tower.Id });
                var s8 = await repository.SaveNewStationAsync(new Station { Name = "8", ControlTowerId = tower.Id });

                await repository.AddConnection(tower.Id, s1.Id, Direction.Landing);
                await repository.AddConnection(tower.Id, s6.Id, Direction.Takeoff);
                await repository.AddConnection(tower.Id, s7.Id, Direction.Takeoff);

                await repository.AddConnection(s1.Id, s2.Id, Direction.Landing);
                await repository.AddConnection(s2.Id, s3.Id, Direction.Landing);
                await repository.AddConnection(s3.Id, s4.Id, Direction.Landing);
                await repository.AddConnection(s4.Id, s5.Id, Direction.Landing);
                await repository.AddConnection(s5.Id, s6.Id, Direction.Landing);
                await repository.AddConnection(s5.Id, s7.Id, Direction.Landing);

                await repository.AddConnection(s6.Id, s8.Id, Direction.Takeoff);
                await repository.AddConnection(s7.Id, s8.Id, Direction.Takeoff);
                await repository.AddConnection(s8.Id, s4.Id, Direction.Takeoff);

            }
        }

        private IOrderedEnumerable<Flight> GetUnfulfilledFlights()
        {
            var logs = repository.GetLogs();
            var flights = repository.GetFlights();

            return flights.Where(f => logs.All(l => l.FlightId != f.Id)).OrderBy(f => f.Date);
        }
        private void GetOnTrackFlightsAndSendThem()
        {
            var logs = repository.GetLogs();

            var onTrackFlights = logs
                .GroupBy(log => log.FlightId)
                .Where(gruop => gruop.All(log => log.ToId != null))
                .Select(gruop => gruop.Last())
                .Select(l => (l.Flight, l.ToId));

            foreach (var (flight, stationId) in onTrackFlights)
            {
                var stationService = stationsBuilder.StationServices.FirstOrDefault(s => s.Id == stationId);

                if (stationService == null || !stationService.PlaneArrived(new PlaneService(flight)))
                    throw new ArgumentNullException();
            }
        }
        public async Task<bool> AddNewFlightAsync(IFlightDTO flight)
        {
            var tower = towerServices.FirstOrDefault(t => t.Id == flight.ControlTowerId);
            if (tower == null) return false;

            var dbFlight = await repository.SaveNewFlightAsync(
                    new Flight
                    {
                        ControlTowerId = flight.ControlTowerId,
                        Date = flight.Date,
                        Direction = flight.Direction,
                        Name = flight.Name
                    });

            SendFlightToControlTower(dbFlight);
            return true;
        }

        private async void SendFlightToControlTower(Flight flight)
        {
            notifier.NotifiyNewFlight(flight);
            var tower = towerServices.FirstOrDefault(t => t.Id == flight.ControlTowerId);
            var time = flight.Date - DateTime.Now;
            if (time >= TimeSpan.Zero)
            {
                await Task.Delay(time);
            }
            tower.PlaneArrived(new PlaneService(flight));
        }

        public IEnumerable<ControlTower> GetControlTowers()
            => repository.GetControlTowers();

        public IEnumerable<IStationDTO> GetStationsForControlTower(Guid controlTowerId)
            => repository.GetStations().Where(s => s.ControlTowerId == controlTowerId);

        public IEnumerable<IRelationDTO> GetRelationsForControlTower(Guid controlTowerId)
        {
            IEnumerable<IRelationDTO> ssr = repository.GetStationToStationRelations()
            .Where(sts => sts.From.ControlTowerId == controlTowerId && sts.To.ControlTowerId == controlTowerId);

            IEnumerable<IRelationDTO> tsr = repository.GetTowerToStationRelations()
             .Where(tts => tts.FromId == controlTowerId);

            return ssr.Concat(tsr);
        }

        public IEnumerable<ActiveFlightDTO> GetActiveFlightsForControlTower(Guid controlTowerId)
        {
            return stationsBuilder.StationServices
                .Where(s => s.ControlTowerId == controlTowerId && s.IsOccupied)
                .Select(s =>
                new ActiveFlightDTO
                {
                    Id = s.Plane.Id,
                    Name = s.Plane.Name,
                    StationId = s.Id,
                    Direction = s.Plane.Direction
                }); ;
        }

        public IEnumerable<Flight> GetUnfulfilledFlightsForControlTower(Guid controlTowerId)
        {
            return GetUnfulfilledFlights().Where(f => f.ControlTowerId == controlTowerId);
        }

        public Task<ControlTower> UpdateControlTowerAsync(Guid controlTowerId, ControlTower controlTower)
            => repository.UpdateControlTowerAsync(controlTowerId, controlTower);


        public Task<ControlTower> AddNewControlTowerAsync(ControlTower controlTower)
            => repository.SaveNewControlTowerAsync(controlTower);


        public Task<ControlTower> DeleteControlTowerAsync(Guid controlTowerId)
            => repository.DeleteAirportAsync(controlTowerId);

        public async Task<IStationDTO> UpdateStationAsync(Guid stationId, Station station)
            => await repository.UpdateStationAsync(stationId, station);

        public async Task<IStationDTO> AddNewStationAsync(Station station)
        => await repository.SaveNewStationAsync(station);

        public async Task<IStationDTO> DeleteStationAsync(Guid stationId)
            => await repository.DeleteStationAsync(stationId);

        public Task<IRelationDTO> AddNewRelationAsync(IRelationDTO relation)
            => repository.AddConnection(relation.FromId, relation.ToId, relation.Direction);


        public Task<IRelationDTO> DeleteRelationAsync(IRelationDTO relation)
            => repository.DeleteConnection(relation.FromId, relation.ToId, relation.Direction);

        public IEnumerable<StationLog> GetStationLogs(Guid stationId)
            => repository.GetLogs(stationId);
    }
}
