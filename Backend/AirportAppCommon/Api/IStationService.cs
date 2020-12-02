using AirportAppCommon.EventHandlers;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.Api
{
    /// <summary>
    /// station logic
    /// </summary>
    public interface IStationService : IPlaneHandlerService
    {
        Guid ControlTowerId { get; }
        IPlaneService Plane { get; }
        bool IsOccupied { get; }

    }
}
