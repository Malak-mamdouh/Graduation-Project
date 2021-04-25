﻿using System;
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
        public string Status { get; set; }
        public bool IsDone { get; set; }
        public int CustomerId { get; set; }
        public virtual Customer Customer { get; set; }
        public int AssetId { get; set; }
        public virtual Asset Asset { get; set;}
        [NotMapped]
        public location Start { get; set; }
        public IList<location> current { get; set; }
        [NotMapped]

        public location End { get; set; }

    }
}
