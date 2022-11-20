using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class TripRepository : ITripRepository
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public TripRepository(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<Trip> CreateTrip(string email, string name, string description, 
            decimal totalExpense = 0)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if(user == null) return null!;
            
            var trip = new Trip {
                Name = name,
                Description = description,
                TotalExpense = totalExpense
            };
            var attendee = new TripAttendee
            {
                AppUser = user,
                Trip = trip
            };
            trip.Attendees.Add(attendee);

            await context.Trips.AddAsync(trip);
            var result = await context.SaveChangesAsync();
            if(result <= 0) return null!;
            return trip;
        }
        public async Task<Trip> AddAttendees(Trip trip)
        {
            var currentTrip = await context.Trips.FirstOrDefaultAsync(t => t.Id == trip.Id);
            if(currentTrip == null) return null!;
            var attendees = new List<TripAttendee>();
            foreach(var attendee in trip.Attendees)
            {
                currentTrip.Attendees.Add(attendee);
            }
            var result = await context.SaveChangesAsync();
            if(result <= 0) return null!;
            return trip;
        }

        public async Task DeleteTrip(int id)
        {
            var trip = await context.Trips.FirstOrDefaultAsync(t => t.Id == id);
            if(trip == null) return;
            context.Trips.Remove(trip);
            var result = await context.SaveChangesAsync();
            return;
        }

        public async Task<IReadOnlyList<TripDto>> GetAllTrips()
        {
            var trips = await context.Trips
                .Include(t => t.Attendees)
                .ThenInclude(u => u.AppUser)
                .ToListAsync();
            return mapper.Map<IReadOnlyList<Trip>, IReadOnlyList<TripDto>>(trips) ?? null!;
        }

        public async Task<TripDto> GetTripById(int id)
        {
            var trip = await context.Trips
                .Include(t => t.Attendees)
                .ThenInclude(u => u.AppUser)
                .FirstOrDefaultAsync(t => t.Id == id);
            return  mapper.Map<Trip, TripDto>(trip!) ?? null!;
        }
    }
}