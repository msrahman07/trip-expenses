using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.DTOs;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class TripsController : BaseApiController
    {
        private readonly ITripRepository tripRepo;

        public TripsController(ITripRepository tripRepo)
        {
            this.tripRepo = tripRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<TripDto>>> GetAllTrips()
        {
            return Ok(await tripRepo.GetAllTrips());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<TripDto>> GetTripById(int id)
        {
            var trip = await tripRepo.GetTripById(id);
            return (trip != null) ? trip : NotFound();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Trip>> CreateTrip(Trip trip)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var result = await tripRepo.CreateTrip(email, trip.Name, trip.Description);
            return (result != null) ? Ok(trip) : BadRequest("Unable to create trip");
        }
        [HttpPost("addAttendees")]
        public async Task<ActionResult<Trip>> AddAttendees(Trip trip)
        {
            return await tripRepo.AddAttendees(trip);

        }
        [HttpDelete("{id}")]
        public async Task DeleteTrip(int id)
        {
            await tripRepo.DeleteTrip(id);
        }
    }
}