using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.DTOs
{
    public class ExpenseDto
    {
        public string Title { get; set; } = null!;
        public decimal Amount { get; set; }
        public decimal SharedAmount { get; set; }

        public AttendeeProfile Spender { get; set; } = null!;
        public bool DividedEqually { get; set; } = true;
        public List<AttendeeProfile> SharedAmongAttendees { get; set; } = new List<AttendeeProfile>();
    }
}