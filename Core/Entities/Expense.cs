using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;

namespace Core.Entities
{
    public class Expense : BaseEntity
    {
        public string Title { get; set; } = null!;
        public decimal Amount { get; set; }
        public decimal SharedAmount { get; set; }
        public TripAttendee Spender { get; set; } = null!;
        public bool DividedEqually { get; set; } = true;
        public List<TripAttendee> SharedAmongAttendees { get; set; } = new List<TripAttendee>();
    }
}

// dotnet ef migrations add ExpenseEntityModified -p Infrastructure -s API -c DataContext