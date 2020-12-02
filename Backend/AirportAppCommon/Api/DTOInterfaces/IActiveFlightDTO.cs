using AirportAppCommon.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.Api.DTOInterfaces
{
    public interface IActiveFlightDTO:IDTO
    {
        public Guid StationId { get; set; }
        public Direction Direction { get; set; }
    }
}
