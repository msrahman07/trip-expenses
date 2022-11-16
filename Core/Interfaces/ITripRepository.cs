using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.DTOs;
using Core.Entities;

namespace Core.Interfaces
{
    public interface ITripRepository
    {
        Task<IReadOnlyList<TripDto>> GetAllTrips();
        Task<TripDto> GetTripById(int id);
        Task<Trip> CreateTrip(string email, string name, string description, decimal totalExpense = 0);
        Task DeleteTrip(int id);

    }
}