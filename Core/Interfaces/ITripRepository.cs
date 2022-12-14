using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.DTOs;
using Core.Entities;
using Core.Entities.Identity;

namespace Core.Interfaces
{
    public interface ITripRepository
    {
        Task<IReadOnlyList<TripDto>> GetAllTrips();
        Task<TripDto> GetTripById(int id);
        Task<TripDto> CreateTrip(string email, string name, string description, decimal totalExpense = 0);
        Task<TripDto> AddAttendees(int id, List<string> usersIds);
        Task DeleteTrip(int id);

    }
}