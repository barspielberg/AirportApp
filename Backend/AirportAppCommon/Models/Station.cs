using AirportAppCommon.Api.DTOInterfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AirportAppCommon.Models
{
    public class Station : IStationDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    
        public Guid ControlTowerId { get; set; }
        public ControlTower ControlTower { get; set; }
        public bool IsDeleted { get; set; }
    }


}
