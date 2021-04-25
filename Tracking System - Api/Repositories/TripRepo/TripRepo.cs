using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Models;

namespace Tracking_System___Api.Repositories.TripRepo
{
    public class TripRepo : ITripRepo
    {
        private readonly Context context;

        public TripRepo(Context context)
        {
            this.context = context;
        }
        public async Task addTrip(Trip tripdto)
        {
            location location = new location() { latitude=0 , longitude=0 , accuracy=0 };
            var trip = new Trip()
            {
                AssetId = tripdto.AssetId,
                Asset = context.assets.FirstOrDefault(x => x.Id == tripdto.AssetId),
                CustomerId = tripdto.CustomerId,
                Customer = context.customers.FirstOrDefault(x => x.Id == tripdto.CustomerId),
                Date = tripdto.Date,
                Destination = tripdto.Destination,
                IsDone = tripdto.IsDone,
                Status = tripdto.Status,
                
                
            };
            await context.Trips.AddAsync(trip);
            await context.SaveChangesAsync();
        }

        public async Task deleteTrip(int id)
        {
            context.Remove(await showTrip(id));
           await context.SaveChangesAsync();
        }

        public async Task<Trip> showTrip(int id)
        {
            var trip = await context.Trips.Include(x => x.Asset).Include(x => x.Customer).Include(x => x.current).FirstOrDefaultAsync(x => x.Id == id);
            return trip;
        }

        public async Task<IList<Trip>> showTrips()
        {
            var trips = await context.Trips.Include(x => x.Asset).Include(x => x.Customer).Include(x => x.current).ToListAsync();
            return trips;
        }

        public async Task<Trip> updateTrip(Trip trip, int id)
        {
            if (trip.Id == id)
            {
                context.Entry(trip).State = EntityState.Modified;
               await context.SaveChangesAsync();
            }
            return null;
        }
    }
}
