using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.Api.DTOInterfaces
{
    public interface IDTO
    {
        Guid Id { get;  }
        string Name { get;  }
    }
}
