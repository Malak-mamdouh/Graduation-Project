using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Dtos;
using Tracking_System___Api.Models;
using Tracking_System___Api.Repositories.TrackingRepo;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tracking_System___Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackingController : ControllerBase
    {
        private readonly ITrackingRepo itrackingrepo;

        public TrackingController( ITrackingRepo itrackingrepo)
        {
            this.itrackingrepo = itrackingrepo;
        }

        // GET api/<TrackingController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<location>>> Get(int id)
        {
            if (id != 0)
            {
                IList<location> tracks = await itrackingrepo.getCurrentLocation(id);
                List<LocationDto> locations = new List<LocationDto>() { };
                foreach (var track in tracks)
                {  
                      var location = new LocationDto();
                    location.latitude = track.latitude;
                    location.longitude = track.longitude;
                    location.accuracy = track.accuracy;
                    locations.Add(location);    
                }
                
                if (locations != null)
                {
                    return Ok(locations);
                }
                else
                {
                    return NoContent();
                }
                

            }
            else return BadRequest();
        }

        // POST api/<TrackingController>/2
        [HttpPost]
        public async Task<IActionResult> Post( location location)
        {
            if (location != null)
            {
                await itrackingrepo.postCurrentLocation(location);
                return StatusCode(202);
            }
            else return BadRequest();
        }
    }
}
