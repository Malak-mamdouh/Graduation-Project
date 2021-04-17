using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Models;
using Tracking_System___Api.Repositories.IssuesRepo;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tracking_System___Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IssuesController : ControllerBase
    {
        private readonly IIssuesRepo iissuesrepo;

        public IssuesController( IIssuesRepo iissuesrepo)
        {
            this.iissuesrepo = iissuesrepo;
        }
        // GET: api/<IssuesController>
        [HttpGet]
        public async Task<ActionResult<IList<Issues>>> GetIssues()
        {
            return Ok(await iissuesrepo.showissues());
        }

        // GET api/<IssuesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Issues>> GetIssue(int id)
        {
            return Ok(await iissuesrepo.showIssue(id));
        }

        // POST api/<IssuesController>
        [HttpPost]
        public async Task<IActionResult> PostIssue( Issues issue)
        {
            if (issue != null)
            {
                await iissuesrepo.addissue(issue);
                return StatusCode(202);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<IssuesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> updateIssue(int id, Issues issue)
        {
            if (id == issue.Id)
            {
               await iissuesrepo.updateIssue(issue, id);
                return StatusCode(202);
            }
            return BadRequest();
        }

        // DELETE api/<IssuesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
           if (id != 0)
            {
                await iissuesrepo.deleteIssue(id);
                return StatusCode(202);
            }
           else
            {
                return BadRequest();
            }
    }
    }
}
