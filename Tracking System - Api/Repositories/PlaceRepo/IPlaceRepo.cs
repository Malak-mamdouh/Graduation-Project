using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Models;

namespace Tracking_System___Api.Repositories.PlaceRepo
{
    public interface IPlaceRepo
    {
        Task<Place> addPlace(Place place);
        Task<bool> deletePlace(int id);
        Task<IList<Place>> showAllPlaces();
        Task<Place> updatePlace(Place place);

    }
}
