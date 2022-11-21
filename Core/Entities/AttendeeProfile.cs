using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;

namespace Core.Entities
{
    public class AttendeeProfile
    {
        public string Id { get; set; } = null!;
        public string DisplayName { get; set; } = null!;
    }
}