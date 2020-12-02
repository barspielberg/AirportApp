using AirportAppCommon.EventHandlers;
using AirportAppCommon.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.Api
{
    /// <summary>
    /// notifiy about changes in the airport
    /// </summary>
   public interface INotifier
    {
        /// <summary>
        /// notifiy about a plane that change loction
        /// </summary>
        /// <param name="e"></param>
        void NotifiyPlaneSended(PlaneSendedEventArgs e);
        /// <summary>
        /// notifiy about a new flight in the database
        /// </summary>
        /// <param name="flight"></param>
        void NotifiyNewFlight(Flight flight);
    }
}
