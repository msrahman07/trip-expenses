using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<Trip> Trips { get; set; } = null!;
        public DbSet<Expense> Expenses { get; set; } = null!;
        public DbSet<TripAttendee> TripAttendees { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<TripAttendee>(t => t.HasKey(ta => new {ta.AppUserId, ta.TripId}));

            builder.Entity<TripAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(t => t.Trips)
                .HasForeignKey(ta => ta.AppUserId);
            
            builder.Entity<TripAttendee>()
                .HasOne(t => t.Trip)
                .WithMany(u => u.Attendees)
                .HasForeignKey(ta => ta.TripId);
            
            // builder.Entity<TripAttendee>()
            //     .HasOne(t => t.Trip)
            //     .WithMany(t => t.ex)
            //     .HasForeignKey(ta => ta.TripId);
        }
    }
}