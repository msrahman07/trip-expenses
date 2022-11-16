using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.DTOs
{
    public class TripDto
    {
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal TotalExpense { get; set; } = 0.0M;
        public List<AttendeeProfile> Attendees { get; set; } = new List<AttendeeProfile>();
        public List<Expense> Expenses { get; set; } = new List<Expense>();
    }
}