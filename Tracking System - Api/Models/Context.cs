using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Dtos;

namespace Tracking_System___Api.Models
{
    public class Context : IdentityDbContext<User,Role,int>
    {
        public Context( DbContextOptions options ) : base(options)
        {
        }
      
        public DbSet<Asset> assets { get; set; }
        public DbSet<Issues> issues { get; set; }
        public DbSet<Customer> customers { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<location> locations { get; set; }
        public DbSet<Place> places { get; set; }
        public DbSet<PlaceUser> PlaceUser { get; set; }
        public DbSet<Department> Departments  { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PlaceUser>().HasKey(p => new { p.PlaceId , p.UserId});
            modelBuilder.Entity<PlaceUser>()
                .HasOne(p => p.user)
                .WithMany(p => p.placeUsers)
                .HasForeignKey(p => p.UserId);
            modelBuilder.Entity<PlaceUser>()
                .HasOne(p => p.place)
                .WithMany(p => p.placeUsers)
                .HasForeignKey(p => p.PlaceId);
            base.OnModelCreating(modelBuilder);
        }
    }
}
