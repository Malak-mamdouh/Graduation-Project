using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Dtos;
using Tracking_System___Api.Models;

namespace Tracking_System___Api.Repositories.PlaceRepo
{
    public class PlaceRepo : IPlaceRepo
    {
        private readonly Context context;
        public PlaceRepo(Context context)
        {
            this.context = context;
        }
        public async Task<Place> addPlace(Place place)
        {
            if (place != null)
            {
                await context.places.AddAsync(place);
                await context.SaveChangesAsync();
                return place;
            }
            return null;
        }

        public async Task<bool> deletePlace(int id)
        {
            var place = await context.places.FirstOrDefaultAsync(x => x.Id == id);
            if (place == null)
                return false;

            context.places.Remove(place);
            await context.SaveChangesAsync();
            return true;
        }
        
       
        public async Task<IList<Place>> showAllPlaces()
        {
            var places = await context.places.ToListAsync();
            foreach (var place in places) {
                place.placeUsers = await context.PlaceUser.Where(p => p.PlaceId == place.Id).ToListAsync();
            }
            return places;
        }

        public async Task<Place> updatePlace(Place place)
        {
            if (place.Id != 0)
            {
                var placeModel = await context.places.FirstOrDefaultAsync(a => a.Id == place.Id);
                if (placeModel == null)
                    return null;
                context.places.Attach(placeModel);
                placeModel.Region = place.Region;
             
                context.Entry(placeModel).Property(a => a.Region).IsModified = true;

                await context.SaveChangesAsync();
                return placeModel;
            }
            return null;
        }
    }
}
