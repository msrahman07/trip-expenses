using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class TripRepository : ITripRepository
    {
        private readonly DataContext context;

        public TripRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<Trip> CreateTrip(string name, string description, decimal totalExpense = 0)
        {
            var trip = new Trip {
                Name = name,
                Description = description,
                TotalExpense = totalExpense
            };
            await context.Trips.AddAsync(trip);
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

        public async Task<IReadOnlyList<Trip>> GetAllTrips()
        {
            return await context.Trips.ToListAsync() ?? null!;
        }

        public async Task<Trip> GetTripById(int id)
        {
            return await context.Trips.FindAsync(id) ?? null!;
        }
    }
}