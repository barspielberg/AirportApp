using AirportAppCommon.Api;
using System;

namespace AirportAppCommon.EventHandlers
{
    public delegate void PlaneEventHandler(IPlaneService sender, EventArgs e);
}
