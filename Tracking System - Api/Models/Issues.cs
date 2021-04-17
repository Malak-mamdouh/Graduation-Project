using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tracking_System___Api.Models
{
    public class Issues
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public string ReportedBy { get; set; }
        public int AssetId { get; set; }
        public virtual  Asset Asset { get; set; }
    }
}
