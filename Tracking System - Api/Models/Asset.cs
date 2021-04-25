using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Tracking_System___Api.Models
{
    public class Asset
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string SubType { get; set; }
        [Required]
        public string Description { get; set; }
        public string Url { get; set; }
        [Required]
        public string AssetNumber { get; set; }
        [NotMapped]
        public IFormFile file { get; set; }
    }
}
