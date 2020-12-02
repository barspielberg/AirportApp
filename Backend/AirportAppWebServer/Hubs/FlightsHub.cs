using AirportAppCommon.Api;
using AirportAppCommon.Api.DTOInterfaces;
using AirportAppCommon.DTO;
using AirportAppCommon.EventHandlers;
using AirportAppCommon.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirportAppWebServer.Hubs
{
    public class FlightsHub : Hub
    {
        public FlightsHub()
        {

        }
        public Task JoinGroup(string controlTowerId)
        {
            if (controlTowerId != null)
                return Groups.AddToGroupAsync(Context.ConnectionId, controlTowerId);
            return Task.CompletedTask;
        }

        public Task LeaveGroup(string controlTowerId)
        {
            if (controlTowerId != null)
                return Groups.RemoveFromGroupAsync(Context.ConnectionId, controlTowerId);
            return Task.CompletedTask;
        }
    }
}
