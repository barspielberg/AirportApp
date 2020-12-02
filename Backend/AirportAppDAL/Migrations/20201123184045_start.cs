using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AirportAppDAL.Migrations
{
    public partial class start : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ControlTowers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ControlTowers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Flights",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Direction = table.Column<int>(type: "INTEGER", nullable: false),
                    ControlTowerId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flights", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Flights_ControlTowers_ControlTowerId",
                        column: x => x.ControlTowerId,
                        principalTable: "ControlTowers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Stations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    ControlTowerId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stations_ControlTowers_ControlTowerId",
                        column: x => x.ControlTowerId,
                        principalTable: "ControlTowers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StationLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    FlightId = table.Column<Guid>(type: "TEXT", nullable: false),
                    FromId = table.Column<Guid>(type: "TEXT", nullable: true),
                    ToId = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StationLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StationLogs_Flights_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StationLogs_Stations_FromId",
                        column: x => x.FromId,
                        principalTable: "Stations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StationLogs_Stations_ToId",
                        column: x => x.ToId,
                        principalTable: "Stations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StationRelations",
                columns: table => new
                {
                    FromId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ToId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Direction = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StationRelations", x => new { x.FromId, x.ToId, x.Direction });
                    table.ForeignKey(
                        name: "FK_StationRelations_Stations_FromId",
                        column: x => x.FromId,
                        principalTable: "Stations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StationRelations_Stations_ToId",
                        column: x => x.ToId,
                        principalTable: "Stations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TowerRelations",
                columns: table => new
                {
                    FromId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ToId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Direction = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TowerRelations", x => new { x.FromId, x.ToId, x.Direction });
                    table.ForeignKey(
                        name: "FK_TowerRelations_ControlTowers_FromId",
                        column: x => x.FromId,
                        principalTable: "ControlTowers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TowerRelations_Stations_ToId",
                        column: x => x.ToId,
                        principalTable: "Stations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Flights_ControlTowerId",
                table: "Flights",
                column: "ControlTowerId");

            migrationBuilder.CreateIndex(
                name: "IX_StationLogs_FlightId",
                table: "StationLogs",
                column: "FlightId");

            migrationBuilder.CreateIndex(
                name: "IX_StationLogs_FromId",
                table: "StationLogs",
                column: "FromId");

            migrationBuilder.CreateIndex(
                name: "IX_StationLogs_ToId",
                table: "StationLogs",
                column: "ToId");

            migrationBuilder.CreateIndex(
                name: "IX_StationRelations_ToId",
                table: "StationRelations",
                column: "ToId");

            migrationBuilder.CreateIndex(
                name: "IX_Stations_ControlTowerId",
                table: "Stations",
                column: "ControlTowerId");

            migrationBuilder.CreateIndex(
                name: "IX_TowerRelations_ToId",
                table: "TowerRelations",
                column: "ToId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StationLogs");

            migrationBuilder.DropTable(
                name: "StationRelations");

            migrationBuilder.DropTable(
                name: "TowerRelations");

            migrationBuilder.DropTable(
                name: "Flights");

            migrationBuilder.DropTable(
                name: "Stations");

            migrationBuilder.DropTable(
                name: "ControlTowers");
        }
    }
}
