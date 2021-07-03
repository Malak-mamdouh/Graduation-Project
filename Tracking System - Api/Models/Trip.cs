using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Dtos;

namespace Tracking_System___Api.Models
{
    public class Trip
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Destination { get; set; }
        [NotMapped]
        public location DestinationInMap { get; set; }
        public string Status { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerAdress { get; set; }
        public string CustomerRegion { get; set; }
        public int DepartmentId { get; set; }
        [ForeignKey("DepartmentId")]
        public virtual Department Department { get; set; }
        public int UserId { get; set; }
        public virtual User user { get; set; }
        [NotMapped]
        public location Start { get; set; }
        public IList<location> current { get; set; }
        [NotMapped]
        public location End { get; set; }

    }
}
