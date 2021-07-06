using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
   // [Authorize(Roles = "Admin")]
    public class DriversController : ControllerBase
    {
        private readonly IDriversRepo _idriverrepo;
        private readonly IEmailSender _emailSender;
        private readonly Context _context;

        public DriversController( IDriversRepo idriverrepo , 
            IEmailSender emailSender , 
            Context context)
        {
            _idriverrepo = idriverrepo;
            _emailSender = emailSender;
            _context = context;
        }
       
        // GET: api/<DriversController>
        [HttpGet]
        public async Task<ActionResult<IList<Driver>>> GetAllDrivers()
        {
            var drivers = await _idriverrepo.showDrivers();
            if (drivers != null)
            {
                return Ok(drivers);
            }
            return BadRequest();
        }
        [HttpGet]
        [Route("{name}")]
        public async Task<IActionResult> IsDriverExists(string name)
        {
            var result = await _context.Users.AnyAsync(n => n.UserName == name);
            if (result)
            {
                return StatusCode(StatusCodes.Status200OK);

            }
            return null;

        }
        [HttpGet]
        [Route("{email}")]
        public async Task<IActionResult> IsEmailExists(string email)
        {
            var result = await _context.Users.AnyAsync(n => n.Email == email);
            if (result)
            {
                return StatusCode(StatusCodes.Status200OK);

            }
            return null;

        }
        
        // GET api/<DriversController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Driver>> GetDriver(int id)
        {
            if (id != 0)
            {
                var driver = await _idriverrepo.showDriver(id);

                if(driver != null)
                    return Ok(driver);
                return BadRequest("Driver is not found");
            }
            return BadRequest("Id is Invalid");
        }
        
        // POST api/<DriversController>
        [HttpPost]
        public async Task<IActionResult> AddDriver (Driver driver)
        {
            if (ModelState.IsValid)
            {
                await _idriverrepo.addDriver(driver);
                return Ok(driver);
            }
            else
            {
                return BadRequest();
            }
        }
        
        // PUT api/<DriversController>/5
        [HttpPut("{Id}")]
        public async Task<IActionResult> EditDriver(Driver driver , int Id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var driverModel = await _idriverrepo.updateDriver(Id , driver);
            if (driverModel == null)
            {
                return BadRequest();
            }
            return StatusCode(202);

        }
        
        // DELETE api/<DriversController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDriver(int id)
        {
            if (id == 0)
                return BadRequest("Id is empty");
            var driver = await _idriverrepo.deleteDriver(id);
            if (driver)
            {
                return Ok();
            }
            return BadRequest();

        }
    }
}
