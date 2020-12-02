using AirportAppCommon.Api;
using AirportAppCommon.Api.DTOInterfaces;
using AirportAppCommon.Enums;
using AirportAppCommon.EventHandlers;
using AirportAppCommon.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AirportBL.BlockServices
{
    public class PlaneService : IPlaneService
    {
        public Guid Id => flight.Id;
        public Direction Direction => flight.Direction;
        public string Name => flight.Name;

        public event PlaneEventHandler ReadyToCotinue;

        private readonly Random rnd;
        private readonly IFlightDTO flight;
        private const int MaxWaitingTime = 7;
        private const int MinWaitingTime = 3;

        public PlaneService(IFlightDTO flight)
        {
            rnd = new Random();
            this.flight = flight;
        }


        public async void StartWatingAtStation()
        {
            await Task.Delay(rnd.Next(MinWaitingTime*1000, MaxWaitingTime * 1000));
            ReadyToCotinue?.Invoke(this, null);
        }
    }
}
