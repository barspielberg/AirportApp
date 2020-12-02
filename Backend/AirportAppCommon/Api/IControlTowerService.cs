using AirportAppCommon.EventHandlers;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.Api
{
    /// <summary>
    /// Manage all the logic of a controlTower object.
    /// Accepts planes and send them to their corresponding stations
    /// </summary>
    public interface IControlTowerService : IPlaneHandlerService
    {
       
    }
}
