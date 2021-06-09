using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Dtos;
using Tracking_System___Api.Models;

namespace Tracking_System___Api.Repositories.TrackingRepo
{
    public class TrackingRepo : ITrackingRepo
    {
        private readonly Context context;

        public TrackingRepo( Context context )
        {
            this.context = context;
        }
        public async Task<IList<location>> getCurrentLocation( int tripid)
        {
            if (tripid != 0)
            {
                var trip = await context.Trips.Include(x=>x.current).FirstOrDefaultAsync(x => x.Id == tripid);
                return trip.current;
            }
            return null;
        }

        public async Task postCurrentLocation( location location )
        {
            var location1 = new location() { TripId = location.TripId, longitude = location.longitude, latitude = location.latitude, Trip = context.Trips.FirstOrDefault(x => x.Id == location.TripId) };
            await context.locations.AddAsync(location1);
            await context.SaveChangesAsync();
                     
        }
    }
}
