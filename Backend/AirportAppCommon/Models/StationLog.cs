using AirportAppCommon.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppCommon.Models
{
    public class StationLog
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public Guid FlightId { get; set; }
        public Flight Flight { get; set; }
        public Guid? FromId { get; set; }
        public Station From { get; set; }
        public Guid? ToId { get; set; }
        public Station To { get; set; }
    }
}
