using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class AttendeeRepository : IAttendeeRepository
    {
        private readonly DataContext context;

        public AttendeeRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<IReadOnlyList<AppUser>> GetAllUsers()
        {
            var users = await this.context.Users.ToListAsync();
            return (users != null) ? users : new List<AppUser>();
        }
    }
}