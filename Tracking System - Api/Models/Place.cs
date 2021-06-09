using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Tracking_System___Api.Models
{
    public class Place
    {
        public int Id { get; set; }
        [Required]
        public string Region { get; set; }
        [NotMapped]
        public int uId { get; set; }
        public IList<PlaceUser> placeUsers { get; set; }
    }
}
