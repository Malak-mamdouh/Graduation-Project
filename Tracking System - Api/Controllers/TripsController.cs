using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tracking_System___Api.Models;
using Tracking_System___Api.Repositories.TripRepo;
using GoogleMaps.LocationServices;


namespace Tracking_System___Api.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        private readonly ITripRepo itrprepo;

        public TripsController(ITripRepo itrprepo)
        {
            this.itrprepo = itrprepo;
        }

        // GET: api/Trips
        [HttpGet]
        public async Task<ActionResult<IList<Trip>>> GetTrips()
        {
            
            var trips = await itrprepo.showTrips();
            /*
            foreach (var trip in trips)
            {
                var locationService = new GoogleLocationService("api-key");
                var point = locationService.GetLatLongFromAddress(trip.Destination);
                trip.DestinationInMap.latitude = point.Latitude;
                trip.DestinationInMap.longitude = point.Longitude;
            };
            */
                
              return Ok(trips);
        }

        // GET: api/Trips/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Trip>> GetTrip(int id)
        {
            var trip = await itrprepo.showTrip(id);

            if (trip == null)
            {
                return NotFound();
            }

            return Ok(trip);
        }

        // PUT: api/Trips/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrip(int id, Trip trip)
        {
            if (id != trip.Id)
            {
                return BadRequest();
            }

            await itrprepo.updateTrip(trip, id);

            return StatusCode(202);
        }

        // POST: api/Trips
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Trip>> PostTrip(Trip trip)
        {
            await itrprepo.addTrip(trip);
            return StatusCode(202);
        }

        // DELETE: api/Trips/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrip(int id)
        {
            if (id != 0)
            {
                await itrprepo.deleteTrip(id);
                return StatusCode(202);
            }
            else
            {
                return BadRequest();
            }


        }
    }
}

