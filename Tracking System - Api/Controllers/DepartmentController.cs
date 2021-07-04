using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Models;
using Tracking_System___Api.Repositories.DepartmentRepo;

namespace Tracking_System___Api.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly Context _context;
        private readonly IDepartmentRepo departmentRepo;

        public DepartmentController(Context context , IDepartmentRepo departmentRepo )
        {
            _context = context;
            this.departmentRepo = departmentRepo;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IList<Department>>> GetAllDepartments()
        {
            var list = await departmentRepo.showDepartments();
            return Ok(list);
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            var department = await departmentRepo.showDepartment(id);

            if (department == null)
            {
                return NotFound();
            }

            return department;
        }
        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> AddDepartment(Department department)
        {
            if (ModelState.IsValid)
            {
                await departmentRepo.addDepartment(department);
                return StatusCode(200);
            }

            return BadRequest();
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var department = await departmentRepo.showDepartment(id);
            if (department == null)
            {
                return NotFound();
            }

            await departmentRepo.deletedepartment(id);

            return NoContent();
        }
    }
}
