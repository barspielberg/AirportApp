using AirportAppCommon.Api.DTOInterfaces;
using AirportAppCommon.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.DTO
{
    public class ActiveFlightDTO : IActiveFlightDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid StationId { get; set; }
        public Direction Direction { get; set; }
    }
}
