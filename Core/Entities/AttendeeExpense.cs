using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;

namespace Core.Entities
{
    public class AttendeeExpense
    {
        public string AppUserId { get; set; } = null!;
        public AppUser AppUser { get; set; } = null!;
        
        public int ExpenseId { get; set; }
        public Expense Expense { get; set; } = null!;
    }
}