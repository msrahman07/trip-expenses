using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddExpenseDto
    {
        public string Title { get; set; } = null!;  
        public string SpenderId { get; set; } = null!;
        public List<string> SharedAmongAttendeesIds { get; set; } = new List<string>(); 
        public decimal Amount { get; set; }
    }
}