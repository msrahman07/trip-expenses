using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
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
        private readonly IExpenseRepository expenseRepo;

        public TripsController(ITripRepository tripRepo, IExpenseRepository expenseRepo)
        {
            this.tripRepo = tripRepo;
            this.expenseRepo = expenseRepo;
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
        public async Task<ActionResult<TripDto>> CreateTrip(Trip trip)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var result = await tripRepo.CreateTrip(email, trip.Name, trip.Description);
            return (result != null) ? result : BadRequest("Unable to create trip");
        }
        [HttpPost("{id}/addAttendees")]
        public async Task<ActionResult<TripDto>> AddAttendees(int id, List<string> usersIds)
        {
            var result = await tripRepo.AddAttendees(id, usersIds);
            return (result != null) ? result : BadRequest("Unable to save attendees");

        }

        [HttpPost("{id}/addExpense")]
        public async Task<ActionResult<ExpenseDto>> AddNewExpense(int id, AddExpenseDto expense)
        {
            var result = await expenseRepo.AddNewExpense(id, expense.Title, expense.SpenderId, expense.SharedAmongAttendeesIds, expense.Amount);
            return (result != null) ? result : BadRequest("Unable to save expense");

        }

        [HttpGet("{id}/getAllExpense")]
        public async Task<ActionResult<IReadOnlyList<ExpenseDto>>> GetAllExpenses(int id)
        {
            var result = await expenseRepo.GetAllExpenses(id);
            return (result != null) ? Ok(result) : BadRequest("Unable to save expense");

        }
        
        [HttpGet("{id}/getExpenseReport")]
        public async Task <ActionResult<ExpenseReportDto>> GetExpenseReport(int id)
        {
            var report = await expenseRepo.GenerateExpenseReport(id);
            return report != null ? report : BadRequest("Unable to generate report");
        }

        [HttpDelete("{id}")]
        public async Task DeleteTrip(int id)
        {
            await tripRepo.DeleteTrip(id);
        }
        [HttpDelete("{id}/{expenseId}")]
        public async Task DeleteExpense(int expenseId)
        {
            await expenseRepo.DeleteExpense(expenseId);
        }
    }
}