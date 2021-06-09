﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tracking_System___Api.Models;
using Tracking_System___Api.Repositories.PlaceRepo;

namespace Tracking_System___Api.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class PlacesController : ControllerBase
    {
        private readonly IPlaceRepo _placeRepo;
        private readonly Context _context;

        public PlacesController(IPlaceRepo placeRepo, Context context)
        {
            _placeRepo = placeRepo;
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Place>>> GetAllPlaces()
        {
            var places = await _placeRepo.showAllPlaces();
            if (places != null)
            {
                return Ok(places);
            }
            return BadRequest();
        }
        [HttpPut]
        public async Task<IActionResult> EditPlace(Place place)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var placeModel = await _placeRepo.updatePlace(place);
            if (placeModel == null)
            {
                return NotFound();
            }
            return StatusCode(202);
        }
        [HttpPost]

        public async Task<ActionResult<Place>> PostPlace(Place place)
        {
            if (ModelState.IsValid)
            {
                var region = await PlaceIsExist(place.Region);
                if (region == null)
                {
                    await _placeRepo.addPlace(place);
                }
                else if(region != null){
                    place.Id = region.Id;
                }

                PlaceUser placeUser = new PlaceUser
                    {
                        PlaceId = place.Id,
                        UserId = place.uId
                    };
                    await _context.PlaceUser.AddAsync(placeUser);
                    await _context.SaveChangesAsync();
                    return Ok(place);
            }
            return BadRequest();
            
        }
        private async Task<Place> PlaceIsExist(string region)
        {
            var existRegion = await _context.places.FirstOrDefaultAsync(p => p.Region == region);
            if (existRegion!= null)
                return existRegion;
            return null;
        }
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeletePlace(int id)
        {
            
            if (id == 0)
                return BadRequest();
            var place = await _placeRepo.deletePlace(id);
            if (place)
            {
                return Ok();
            }
            return BadRequest();

        }
    }
}
