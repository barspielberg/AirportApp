using AirportAppCommon.Api.DTOInterfaces;
using AirportAppCommon.Enums;
using AirportAppCommon.EventHandlers;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.Api
{
    /// <summary>
    /// plane logic
    /// </summary>
    public interface IPlaneService
    {
        Guid Id { get; }
        Direction Direction { get; }
        string Name { get; }

        event PlaneEventHandler ReadyToCotinue;

        void StartWatingAtStation();
    }
}
