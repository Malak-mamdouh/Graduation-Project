using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tracking_System___Api.Models
{
    public class User : IdentityUser<Guid>
    {
      
        public string Password { get; set; }
    }
}
