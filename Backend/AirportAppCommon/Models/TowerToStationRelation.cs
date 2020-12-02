using AirportAppCommon.Api.DTOInterfaces;
using AirportAppCommon.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.Models
{
    public class TowerToStationRelation : IRelationDTO
    {
        public Guid FromId { get; set; }
        public ControlTower From { get; set; }
        public Guid ToId { get; set; }
        public Station To { get; set; }
        public Direction Direction { get; set; }
    }
}
