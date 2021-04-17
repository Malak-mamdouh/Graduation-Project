using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Dtos;
using Tracking_System___Api.Models;
using Tracking_System___Api.Repositories.DriversRepo;
using Tracking_System___Api.Repositories.EmailRepo;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tracking_System___Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriversController : ControllerBase
    {
        private readonly IDriversRepo idriverrepo;
        private readonly IEmailSender emailSender;

        public DriversController( IDriversRepo idriverrepo , IEmailSender emailSender)
        {
            this.idriverrepo = idriverrepo;
            this.emailSender = emailSender;
        }
        // GET: api/<DriversController>
        [HttpGet]
        public async Task<ActionResult<IList<Driver>>> GetDrivers()
        {
            var drivers = await idriverrepo.showDrivers();
            return Ok(drivers);
        }

        // GET api/<DriversController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Driver>> GetDriver(int id)
        {
            if (id != 0)
            {
                var driver = await idriverrepo.showDriver(id);
                return Ok(driver);
            }
            return BadRequest();
        }

        // POST api/<DriversController>
        [HttpPost]
        public async Task<IActionResult> AddDriver (Driver driver)
        {
            if (driver != null)
            {
                await idriverrepo.addDriver(driver);
                return StatusCode(202);
            }
            else return BadRequest();
        }

        // PUT api/<DriversController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDriver(int id, Driver driver)
        {
            if (id != 0 && driver != null)
            {
               await idriverrepo.updateDriver(driver, id);
                return StatusCode(202);
            }
            return BadRequest();
        }

        // DELETE api/<DriversController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDriver(int id)
        {
            if (id != 0)
            {
               await idriverrepo.deleteDriver(id);
                return StatusCode(202);
            }
            return BadRequest();

        }
    }
}
