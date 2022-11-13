using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface ITripRepository
    {
        Task<IReadOnlyList<Trip>> GetAllTrips();
        Task<Trip> GetTripById(int id);
        Task<Trip> CreateTrip(string name, string description, decimal totalExpense = 0);
        Task DeleteTrip(int id);

    }
}