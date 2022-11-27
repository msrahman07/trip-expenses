using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.DTOs
{
    public class ExpenseReportDto
    {
        // public Dictionary<AttendeeProfile, Dictionary<AttendeeProfile, decimal>> OwingReport { get; set; } = new Dictionary<AttendeeProfile, Dictionary<AttendeeProfile, decimal>>();
        // public string OwedToId { get; set; } = null!;
        // public Dictionary<string, Dictionary<string, decimal>> OwingReport { get; set; } = new Dictionary<string, Dictionary<string, decimal>>();
        public string OwedTo { get; set; } = null!;
        public List<ShareeDto> Sharees { get; set; } = new List<ShareeDto>();
    }
}