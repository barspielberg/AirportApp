using AirportAppCommon.Api;
using AirportAppCommon.DTO;
using AirportAppCommon.EventHandlers;
using AirportAppCommon.Models;
using AirportAppWebServer.Hubs;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirportAppWebServer
{
    public class FlightNotifier : INotifier
    {
        private readonly IHubContext<FlightsHub> hubContext;

        public FlightNotifier(IHubContext<FlightsHub> hubContext)
        {
            this.hubContext = hubContext;
        }


        public async void NotifiyNewFlight(Flight flight)
        {
            await hubContext.Clients.Group(flight.ControlTowerId.ToString()).SendAsync("newFlight", flight);
        }

        public async void NotifiyPlaneSended(PlaneSendedEventArgs e)
        {
            var activeFlight = new ActiveFlightDTO
            {
                Id = e.PlaneSended?.Id ?? Guid.Empty,
                Name = e.PlaneSended?.Name,
                StationId = e.SendedTo?.Id ?? Guid.Empty,
                Direction = e.PlaneSended.Direction
            };

            Guid towerId = e.SendedFrom?.ControlTowerId ?? e.SendedTo?.ControlTowerId ?? Guid.Empty;

            await hubContext.Clients.Group(towerId.ToString()).SendAsync("planeSended", activeFlight);
        }
    }
}
