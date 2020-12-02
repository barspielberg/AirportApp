using AirportAppCommon.Api;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.EventHandlers
{
    public class PlaneSendedEventArgs : EventArgs
    {
        public IPlaneService PlaneSended { get;  }
        public IStationService SendedTo { get;  }
        public IStationService SendedFrom { get;  }
        public PlaneSendedEventArgs(IPlaneService planeSended, IStationService sendedTo, IStationService sendedFrom)
        {
            PlaneSended = planeSended;
            SendedTo = sendedTo;
            SendedFrom = sendedFrom;
        }
    }
}
