using AirportAppCommon.Api;
using AirportAppCommon.EventHandlers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AirportAppBL
{
    public class NotificationService : INotificationService
    {
        private readonly INotifier notifier;
        private readonly IAirportLogger logger;
        private IEnumerable<IPlaneHandlerService> planeHandlerService = new List<IPlaneHandlerService>();

        public NotificationService(INotifier notifier, IAirportLogger logger)
        {
            this.notifier = notifier;
            this.logger = logger;
        }

        public void SetServicesForNotification(IEnumerable<IPlaneHandlerService> services)
        {
            var newTowerServices = services.Where(t => planeHandlerService.All(ts => ts.Id != t.Id));
            foreach (var tower in newTowerServices)
                tower.PlaneSended += PlaneSended;

            planeHandlerService = planeHandlerService.Concat(newTowerServices).ToList();
        }

        private void PlaneSended(object sender, PlaneSendedEventArgs e)
        {
            notifier?.NotifiyPlaneSended(e);
            logger?.LogAsync(e);
        }

    }
}
