﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tracking_System___Api.Dtos
{
    public class ResetPasswordDto
    {
        [Required]
        public string Email { get; set; }
        public string Token { get; set; }
        [Required]
        public string NewPassword { get; set; }
    }
}
