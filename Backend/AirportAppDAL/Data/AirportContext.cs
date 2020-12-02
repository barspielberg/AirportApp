using AirportAppCommon.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

using System.Text;

namespace AirportAppDAL.Data
{
    public class AirportContext : DbContext
    {
        public DbSet<ControlTower> ControlTowers { get; set; }
        public DbSet<Station> Stations { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<StationLog> StationLogs { get; set; }
        public DbSet<StationToStationRelation> StationRelations { get; set; }
        public DbSet<TowerToStationRelation> TowerRelations { get; set; }
        public AirportContext(DbContextOptions<AirportContext> options) : base(options)
        {
            Database.Migrate();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StationToStationRelation>().HasKey(k => new { k.FromId, k.ToId, k.Direction });
            modelBuilder.Entity<TowerToStationRelation>().HasKey(k => new { k.FromId, k.ToId, k.Direction });
            base.OnModelCreating(modelBuilder);
        }

    }
}
