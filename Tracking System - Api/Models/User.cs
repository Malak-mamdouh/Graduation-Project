using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Tracking_System___Api.Models
{
    public class User : IdentityUser<int>
    {
        public string LastName { get; set; }
        public string Adress { get; set; }
        public string City { get; set; }
        public string Url { get; set; }
        [NotMapped]
        public IFormFile file { get; set; }
        public IList<PlaceUser> placeUsers { get; set; }
        public IList<Trip> trips { get; set; }
    }
}
