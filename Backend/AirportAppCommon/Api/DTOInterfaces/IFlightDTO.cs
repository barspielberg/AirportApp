using AirportAppCommon.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.Api.DTOInterfaces
{
    public interface IFlightDTO : IDTO
    {
        DateTime Date { get; }
        Guid ControlTowerId { get; }
        Direction Direction { get; }
    }
}
