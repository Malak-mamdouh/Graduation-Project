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
        private readonly IAssetRepo assetRepo;

        public AssetsController( IAssetRepo assetRepo)
        {
            this.assetRepo = assetRepo;
        }

        // GET: api/Assets
        [HttpGet]
       
        public async Task<ActionResult<IEnumerable<Asset>>> GetAllAssets()
        {
            var assets = await assetRepo.showAllAssets();
            if (assets != null)
            {
                return Ok(assets);
            }
            return BadRequest();
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
        [HttpPut]
        public async Task<IActionResult> EditAsset(Asset asset)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var assetModel = await assetRepo.updateAsset(asset);
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
            if (id == 0)
                return BadRequest();
            var asset = await assetRepo.deleteAsset(id);
            if (asset)
            {
                return Ok();
            }
            return BadRequest();
           
        }
        [HttpPost , DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            var file = Request.Form.Files[0];
            var folderName = Path.Combine("Resources" , "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory() , folderName);

            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullpath = Path.Combine(pathToSave , fileName);
                var url = Path.Combine(folderName , fileName);
                using (var stream = new FileStream(fullpath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                return Ok(new { url });
            }
            else
            {
                return BadRequest();
            }
        }
       
    }
}
