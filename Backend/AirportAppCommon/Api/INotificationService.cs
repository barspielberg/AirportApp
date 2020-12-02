using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.Api
{
    public interface INotificationService
    {
        /// <summary>
        /// register to changes in the airport
        /// </summary>
        /// <param name="services"></param>
        void SetServicesForNotification(IEnumerable<IPlaneHandlerService> services);
    }
}
