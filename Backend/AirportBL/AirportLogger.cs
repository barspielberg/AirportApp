using AirportAppCommon.Api;
using AirportAppCommon.Enums;
using AirportAppCommon.EventHandlers;
using AirportAppCommon.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;

namespace AirportAppBL
{
    public class AirportLogger : IAirportLogger
    {
        private readonly IServiceScopeFactory serviceScopeFactory;

        public AirportLogger(IServiceScopeFactory serviceScopeFactory)
        {
            this.serviceScopeFactory = serviceScopeFactory;
        }

        public async void LogAsync(PlaneSendedEventArgs e)
        {
            using var scope = serviceScopeFactory.CreateScope();
            var repository = scope.ServiceProvider.GetRequiredService<IAirportRepository>();
            await repository.SaveNewLogAsync(new StationLog
            {
                FromId = e.SendedFrom?.Id,
                ToId = e.SendedTo?.Id,
                Date = DateTime.Now,
                FlightId = e.PlaneSended.Id
            });
        }
    }
}
