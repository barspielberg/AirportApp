using AirportAppCommon.Api.DTOInterfaces;
using AirportAppCommon.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.DTO
{
    public class RelationDTO : IRelationDTO
    {
        public Guid FromId { get; set; }
        public Guid ToId { get; set; }
        public Direction Direction { get; set; }
    }
}
