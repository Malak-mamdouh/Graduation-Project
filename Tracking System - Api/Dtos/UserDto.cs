﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tracking_System___Api.Dtos
{
    public class UserDto
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string LastName { get; set; }

    }
}
