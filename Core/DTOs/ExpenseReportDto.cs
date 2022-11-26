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
        public Dictionary<string, Dictionary<string, decimal>> OwingReport { get; set; } = new Dictionary<string, Dictionary<string, decimal>>();
    }
}