using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirportAppCommon.Api;
using AirportAppCommon.Api.DTOInterfaces;
using AirportAppCommon.DTO;
using AirportAppCommon.EventHandlers;
using AirportAppCommon.Models;
using AirportAppWebServer.Hubs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace AirportAppWebServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirportController : ControllerBase
    {
        private readonly IDataService dataService;
        public AirportController(IDataService dataService)
        {
            this.dataService = dataService;
        }

        [HttpGet("ControlTowers")]
        public async Task<IActionResult> GetControlTowers()
        {
            var res = await Task.Run(() => dataService.GetControlTowers());
            if (res == null) return NotFound();
            return Ok(res);
        }

        [HttpGet("StationsForControlTower/{controlTowerId}")]
        public async Task<IActionResult> GetStationsForControlTower(Guid controlTowerId)
        {
            var res = await Task.Run(() =>
            dataService.GetStationsForControlTower(controlTowerId)
            .Select(s =>
            new StationDTO
            {
                Id = s.Id,
                Name = s.Name,
                ControlTowerId = s.ControlTowerId,
            }
            ));

            if (res == null) return NotFound();
            return Ok(res);
        }

        [HttpGet("RelationsForControlTower/{controlTowerId}")]
        public async Task<IActionResult> GetRelationsForControlTower(Guid controlTowerId)
        {
            var res = await Task.Run(() =>
            dataService.GetRelationsForControlTower(controlTowerId)
            .Select(sts =>
            new RelationDTO
            {
                Direction = sts.Direction,
                FromId = sts.FromId,
                ToId = sts.ToId
            }
            ));
            if (res == null) return NotFound();
            return Ok(res);
        }


        [HttpPost("Flight")]
        public async Task<IActionResult> NewFlightAsync(Flight flight)
        {
            var res = await dataService.AddNewFlightAsync(flight);
            if (res) return Ok();
            return BadRequest();
        }

        [HttpGet("ActiveFlightsForControlTower/{controlTowerId}")]
        public async Task<IActionResult> GetActiveFlightsForControlTower(Guid controlTowerId)
        {
            var res = await Task.Run(() => dataService.GetActiveFlightsForControlTower(controlTowerId));
            if (res == null) return NotFound();
            return Ok(res);
        }

        [HttpGet("UnfulfilledFlightsForControlTower/{controlTowerId}")]
        public async Task<IActionResult> GetUnfulfilledFlightsForControlTower(Guid controlTowerId)
        {
            var res = await Task.Run(() => dataService.GetUnfulfilledFlightsForControlTower(controlTowerId));
            if (res == null) return NotFound();
            return Ok(res);
        }


        [HttpPut("ControlTower/{controlTowerId}")]
        public async Task<IActionResult> UpdateControlTower(Guid controlTowerId, ControlTower controlTower)
        {
            var res = await dataService.UpdateControlTowerAsync(controlTowerId, controlTower);
            if (res != null) return Ok(res);
            return BadRequest();
        }
        [HttpPost("ControlTower")]
        public async Task<IActionResult> AddNewControlTower(ControlTower controlTower)
        {
            var res = await dataService.AddNewControlTowerAsync(controlTower);
            if (res != null) return Ok(res);
            return BadRequest();
        }
        [HttpDelete("ControlTower/{controlTowerId}")]
        public async Task<IActionResult> DeleteControlTower(Guid controlTowerId)
        {
            var res = await dataService.DeleteControlTowerAsync(controlTowerId);
            if (res != null) return Ok(res);
            return BadRequest();
        }


        [HttpPut("Station/{stationId}")]
        public async Task<IActionResult> UpdateStation(Guid stationId, Station station)
        {
            var res = await dataService.UpdateStationAsync(stationId, station);
            if (res != null) return Ok(res);
            return BadRequest();
        }
        [HttpPost("Station")]
        public async Task<IActionResult> AddNewStation(Station station)
        {
            var res = await dataService.AddNewStationAsync(station);
            if (res != null) return Ok(res);
            return BadRequest();
        }
        [HttpDelete("Station/{stationId}")]
        public async Task<IActionResult> DeleteStation(Guid stationId)
        {
            var res = await dataService.DeleteStationAsync(stationId);
            if (res != null) return Ok(res);
            return BadRequest();
        }


        [HttpPost("Relation")]
        public async Task<IActionResult> AddNewRelation(RelationDTO Relation)
        {
            var res = await dataService.AddNewRelationAsync(Relation);
            if (res != null) return Ok(res);
            return BadRequest();
        }
        [HttpPost("DeleteRelation")]
        public async Task<IActionResult> DeleteRelation(RelationDTO relation)
        {
            var res = await dataService.DeleteRelationAsync(relation);
            if (res != null) return Ok(res);
            return BadRequest();
        }

        [HttpGet("StationLogs/{stationId}")]
        public async Task<IActionResult> GetStationLogs(Guid stationId)
        {
            var res = await Task.Run(() => dataService.GetStationLogs(stationId));
            if (res.Count() > 0) return Ok(res);
            return BadRequest();
        }

    }
}
