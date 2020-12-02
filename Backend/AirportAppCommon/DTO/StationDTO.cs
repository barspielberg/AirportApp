using AirportAppCommon.Api.DTOInterfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.DTO
{
    public class StationDTO : IStationDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid ControlTowerId { get; set; }
    }
}
