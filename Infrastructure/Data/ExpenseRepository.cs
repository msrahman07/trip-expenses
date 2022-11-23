using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public ExpenseRepository(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<ExpenseDto> AddNewExpense(int tripId, string title, string spenderId, List<string> sharedAmongAttendeesIds, decimal amount)
        {
            var trip = await context.Trips
                .Include(t => t.Attendees).ThenInclude(t => t.AppUser)
                .Include(t => t.Expenses)
                .FirstOrDefaultAsync(t => t.Id == tripId);
            if (trip == null) return null!;
            var spender = trip.Attendees.Find(a => a.AppUserId == spenderId);
            var sharedAmongAttendees = trip.Attendees.FindAll(a => sharedAmongAttendeesIds.Any(sa => sa == a.AppUserId));
            
            var newExpense = new Expense
            {
                Title = title,
                Amount = amount,
                SharedAmount = amount / (sharedAmongAttendees.Count + 1),
                Spender = spender!
            };
            foreach(var attendees in sharedAmongAttendees)
            {
                var attendee = new AttendeeExpense
                {
                    AppUser = attendees.AppUser,
                    Expense = newExpense
                };
                newExpense.SharedAmongAttendees.Add(attendee);
            }

            trip.Expenses.Add(newExpense);
            await context.Expenses.AddAsync(newExpense);
            var result = await context.SaveChangesAsync() > 0;
            return (result) ? mapper.Map<Expense, ExpenseDto>(newExpense) : null!;
        }

        public async Task<IReadOnlyList<ExpenseDto>> GetAllExpenses(int tripId)
        {
            var trip = await context.Trips
                .Include(t => t.Attendees)
                .ThenInclude(u => u.AppUser)
                .Include(t => t.Expenses)
                .ThenInclude(e => e.SharedAmongAttendees)
                .FirstOrDefaultAsync(t => t.Id == tripId);
            var expenses = (trip != null) ? trip.Expenses : new List<Expense>();
            return mapper.Map<IReadOnlyList<Expense>, IReadOnlyList<ExpenseDto>>(expenses);
        }

        public async Task DeleteExpense(int ExpenseId)
        {
            var expense = await context.Expenses.FirstOrDefaultAsync(e => e.Id == ExpenseId);
            if (expense == null) return;
            context.Expenses.Remove(expense);
            var result = await context.SaveChangesAsync();
            return;
        }
    }
}