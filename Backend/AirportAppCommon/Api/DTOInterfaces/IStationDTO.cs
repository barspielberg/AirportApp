using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.Api.DTOInterfaces
{
    public interface IStationDTO : IDTO
    {
        Guid ControlTowerId { get; }
    }
}
