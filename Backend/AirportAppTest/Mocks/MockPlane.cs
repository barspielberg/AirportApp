using AirportAppCommon.Api;
using AirportAppCommon.Enums;
using AirportAppCommon.EventHandlers;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppTest.Mocks
{
    class MockPlane : IPlaneService
    {

        public Direction Direction { get; set; }

        public Guid Id => Guid.Empty;

        public string Name { get; set; }

        public event PlaneEventHandler ReadyToCotinue;

        public void StartWatingAtStation()
        {
            
        }

        public void StopWating()
        {
            ReadyToCotinue?.Invoke(this, null);
        }
    }
}
