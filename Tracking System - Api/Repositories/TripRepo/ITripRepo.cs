using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Models;

namespace Tracking_System___Api.Repositories.TripRepo
{
   public interface ITripRepo
    {
        Task addTrip(Trip trip);
        Task<IList<Trip>> showTrips();
        Task deleteTrip(int id);
        Task<Trip> updateTrip(Trip trip , int id);
        Task<Trip> showTrip(int id);
    }
}
