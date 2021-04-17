using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Dtos;

namespace Tracking_System___Api.Models
{
    public class Context : IdentityDbContext<User,Role,Guid>
    {
        public Context( DbContextOptions options ) : base(options)
        {
        }
      public  DbSet<Driver> drivers { get; set; }
        public DbSet<Asset> assets { get; set; }
        public DbSet<Issues> issues { get; set; }
        public DbSet<Customer> customers { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<location> locations { get; set; }


    }
}
