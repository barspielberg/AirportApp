using AirportAppCommon.Api.DTOInterfaces;
using AirportAppCommon.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.Models
{
    public class Flight : IFlightDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public Direction Direction { get; set; }
        public Guid ControlTowerId { get; set; }
        public ControlTower ControlTower { get; set; }
    }
}
