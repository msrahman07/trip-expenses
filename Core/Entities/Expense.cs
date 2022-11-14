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
        public AppUser Spender { get; set; } = null!;
        public bool DividedEqually { get; set; }
        public List<AppUser> SharedAmongAttendees { get; set; } = new List<AppUser>();
    }
}