using AirportAppCommon.EventHandlers;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.Api
{
    /// <summary>
    /// can receive planes and transfer them to another station
    /// </summary>
    public interface IPlaneHandlerService
    {
        Guid Id { get; }

        event EventHandler<PlaneSendedEventArgs> PlaneSended;
        IEnumerable<IStationService> TakeoffStations { get; set; }
        IEnumerable<IStationService> LandStations { get; set; }

        bool PlaneArrived(IPlaneService plane);
    }
}
