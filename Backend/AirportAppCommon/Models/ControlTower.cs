using AirportAppCommon.Api.DTOInterfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.Models
{
    public class ControlTower: IControlTowerDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }
    }
}
