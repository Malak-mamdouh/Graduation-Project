using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Tracking_System___Api.Dtos
{
    public class Driver
    {
    
        public string FirstName { get; set; }
       
        public string LastName { get; set; }
        public string Url { get; set; }
        [NotMapped]
        public IFormFile file { get; set; }
     
        public string Phone { get; set; }
 
        public string Password { get; set; }
     
        public string Email { get; set; }
    }
}
