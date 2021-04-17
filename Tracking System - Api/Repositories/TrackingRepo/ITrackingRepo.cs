using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Dtos;
using Tracking_System___Api.Models;

namespace Tracking_System___Api.Repositories.TrackingRepo
{
   public interface ITrackingRepo
    {
        Task<IList<location>> getCurrentLocation(int tripid);
        Task postCurrentLocation(location location);

        
    }
}
