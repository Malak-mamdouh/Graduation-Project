using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tracking_System___Api.Models;
using Tracking_System___Api.Repositories.AssetRepo;

namespace Tracking_System___Api.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        private readonly IAssetRepo _assetRepo;
        private readonly Context _context;

        public AssetsController( IAssetRepo assetRepo , Context context)
        {
            _assetRepo = assetRepo;
            _context = context;
        }

        // GET: api/Assets
        [HttpGet]
       
        public async Task<ActionResult<IEnumerable<Asset>>> GetAllAssets()
        {
            var assets = await _assetRepo.showAllAssets();
            if (assets != null)
            {
                return Ok(new { data = assets });
            }
            return BadRequest();
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Asset>>> GetAllPrivateAssets()
        {
            var assets = await _assetRepo.showAllPrivateAssets();
            if (assets != null)
            {
                return Ok(new { data = assets });
            }
            return BadRequest();
        }

        // GET: api/Assets/5
        [HttpGet("{id}")]
        
        public async Task<ActionResult<Asset>> GetAsset(int id)
        {
            var asset = await _assetRepo.showAsset(id);

            if (asset == null)
            {
                return NotFound();
            }

            return Ok(asset);
        }

        // PUT: api/Assets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> EditAsset(Asset asset)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var assetModel = await _assetRepo.updateAsset(asset);
            if (assetModel == null)
            {
                return NotFound();
            }
            return StatusCode(202);
        }

        // POST: api/Assets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        
        public async Task<ActionResult<Asset>> PostAsset(Asset asset)
        {
            if (ModelState.IsValid)
            {
                await _assetRepo.addAsset(asset);
                return Ok(asset);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE: api/Assets/5
        [HttpDelete("{id}")]
       
        public async Task<IActionResult> DeleteAsset(int id)
        {
            if (id == 0)
                return BadRequest();
            var asset = await _assetRepo.deleteAsset(id);
            if (asset)
            {
                return Ok();
            }
            return BadRequest();
           
        }
        [HttpGet]
        [Route("{name}")]
        public async Task<IActionResult> IsNameExists(string name)
        {
            var result = await _context.assets.AnyAsync(n => n.Name == name);
            if (result)
            {
                return StatusCode(StatusCodes.Status200OK);

            }
            return null;

        }
        [HttpGet]
        [Route("{number}")]
        public async Task<IActionResult> IsNumberExists(string number)
        {
            var result = await _context.assets.AnyAsync(n => n.AssetNumber == number);
            if (result)
            {
                return StatusCode(StatusCodes.Status200OK);

            }
            return null;

        }
        [HttpGet]
        public async Task<IEnumerable<string>> SelectAllAssetNumber()
        {
            var numbers = await _assetRepo.SelectAssetNumberAsync();
            if (numbers == null)
                return null;
            return numbers;
        }       
    }
}
