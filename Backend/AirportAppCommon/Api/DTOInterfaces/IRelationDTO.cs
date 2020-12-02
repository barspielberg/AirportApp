using AirportAppCommon.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.Api.DTOInterfaces
{
    public interface IRelationDTO
    {
        public Guid FromId { get;  }
        public Guid ToId { get;  }
        public Direction Direction { get;  }
    }
}
