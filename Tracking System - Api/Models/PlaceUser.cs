using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tracking_System___Api.Models
{
    public class PlaceUser
    {
        public int UserId { get; set; }
        public virtual User user { get; set; }
        public int PlaceId { get; set; }
        public virtual Place place { get; set; }
    }
}
