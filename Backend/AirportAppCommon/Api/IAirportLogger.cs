using AirportAppCommon.EventHandlers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AirportAppCommon.Api
{
    /// <summary>
    /// Save airport history to the database
    /// </summary>
    public interface IAirportLogger
    {
        void LogAsync(PlaneSendedEventArgs e);
    }
}
