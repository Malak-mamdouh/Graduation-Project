using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tracking_System___Api.Models
{
    public class location
    {
        public int Id { get; set;}
      
        public double latitude { get; set; }
        public double longitude { get; set; }
        public int TripId { get; set; }
        public virtual Trip Trip { get; set; }
    }
}
