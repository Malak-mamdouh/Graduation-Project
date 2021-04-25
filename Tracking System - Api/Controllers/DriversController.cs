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
    [Route("[controller]/[action]")]
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
        public async Task<ActionResult<IList<Driver>>> GetAllDrivers()
        {
            var drivers = await idriverrepo.showDrivers();
            if (drivers != null)
            {
                return Ok(drivers);
            }
            return BadRequest();
        }
       /* 
       // GET api/<DriversController>/5
       [HttpGet("{id}")]
       public async Task<ActionResult<Driver>> GetDriver(string id)
       {
           if (id != "")
           {
               var driver = await idriverrepo.showDriver(id);
               return Ok(driver);
           }
           return BadRequest();
       }
       */
        // POST api/<DriversController>
        [HttpPost]
        public async Task<IActionResult> AddDriver (Driver driver)
        {
            if (ModelState.IsValid)
            {
                await idriverrepo.addDriver(driver);
                return Ok(driver);
            }
            else
            {
                return BadRequest();
            }
        }
        /*
        // PUT api/<DriversController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditDriver(Driver driver)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var driverModel = await idriverrepo.updateDriver(driver);
            if (driverModel == null)
            {
                return NotFound();
            }
            return StatusCode(202);

        }

        // DELETE api/<DriversController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDriver(int id)
        {
            if (id == 0)
                return BadRequest();
            var driver = await idriverrepo.deleteDriver(id);
            if (driver)
            {
                return Ok();
            }
            return BadRequest();

        }*/
    }
}
