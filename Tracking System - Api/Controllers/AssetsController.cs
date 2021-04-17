using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tracking_System___Api.Models;
using Tracking_System___Api.Repositories.AssetRepo;

namespace Tracking_System___Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        private readonly IAssetRepo assetRepo;

        public AssetsController( IAssetRepo assetRepo)
        {
            this.assetRepo = assetRepo;
        }

        // GET: api/Assets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Asset>>> Getassets()
        {
            var assets = await assetRepo.showAssets();
            return Ok(assets);
        }

        // GET: api/Assets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Asset>> GetAsset(int id)
        {
            var asset = await assetRepo.showAsset(id);

            if (asset == null)
            {
                return NotFound();
            }

            return Ok(asset);
        }

        // PUT: api/Assets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsset(int id, Asset asset)
        {
            if (id != asset.Id)
            {
                return BadRequest();
            }


            await assetRepo.updateAsset(asset, id);
            return StatusCode(202);
        }

        // POST: api/Assets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Asset>> PostAsset(Asset asset)
        {
            if (asset != null)
            {
                await assetRepo.addAsset(asset);
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
            if (id != 0)
            {
                await assetRepo.deleteAsset(id);
                return StatusCode(202);
            }
            else
            {
                return BadRequest();
            }

           
        }

       
    }
}
