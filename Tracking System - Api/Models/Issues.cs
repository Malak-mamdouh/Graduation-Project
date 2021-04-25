using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tracking_System___Api.Models
{
    public class Issues
    {
        public int Id { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string ReportedBy { get; set; }
        public int AssetId { get; set; }
        public virtual  Asset Asset { get; set; }
    }
}
