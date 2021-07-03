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
            location location = new location() { latitude=0 , longitude=0 };
            var trip = new Trip()
            {
                /*AssetId = tripdto.AssetId,
                Asset = context.assets.FirstOrDefault(x => x.Id == tripdto.AssetId),*/
               
                DepartmentId = tripdto.DepartmentId,
                Department = context.Departments.FirstOrDefault(t => t.Id == tripdto.DepartmentId),
                Date = tripdto.Date,
                Destination = tripdto.Destination,
                Status = tripdto.Status,
                CustomerAdress = tripdto.CustomerAdress,
                CustomerName = tripdto.CustomerName,
                CustomerPhone = tripdto.CustomerPhone,
                CustomerRegion = tripdto.CustomerRegion,
            };
            var Userplace = await context.places.FirstOrDefaultAsync(p => p.Region == trip.CustomerRegion);
            var users = await context.PlaceUser.Where(pu => pu.PlaceId == Userplace.Id).
                Select(pu => pu.user).ToListAsync();
            
            if (users != null)
            {
                foreach (var user in users)
                {
                    var trips = user.trips; //error
                    if (trips != null)
                    {
                        var userTrips = trips.Where(t => t.Status == "Waiting").ToList();
                        if (userTrips != null)
                        {
                            var tr = userTrips.FirstOrDefault(t => t.Date == trip.Date);
                            if (tr == null)
                            {
                                trip.UserId = user.Id;
                                break;
                            }
                        }
                       
                    }
                    else if (trips == null)
                    {
                        trip.UserId = user.Id;
                        break;
                    }
                }
                await context.Trips.AddAsync(trip);
                await context.SaveChangesAsync();
            }
            return;
        }

        public async Task deleteTrip(int id)
        {
            context.Remove(await showTrip(id));
           await context.SaveChangesAsync();
        }

        public async Task<Trip> showTrip(int id)
        {
            var trip = await context.Trips.Include(x => x.Department).Include(x => x.current).FirstOrDefaultAsync(x => x.Id == id);
            return trip;
        }

        public async Task<IList<Trip>> showTrips(string status)
        {
            if (status != null)
            {
                var filteredByStatus = await context.Trips.Where(t => t.Status == status).ToListAsync();
                return filteredByStatus;
            }
            var trips = await context.Trips.Include(x => x.Department).Include(x => x.current).Include(x => x.user).ToListAsync();
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
