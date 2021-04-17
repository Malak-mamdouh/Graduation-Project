using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tracking_System___Api.Dtos
{
    public class LocationDto
    {
        public double latitude { get; set; }
        public double longitude { get; set; }
        public double accuracy { get; set; }
    }
}
