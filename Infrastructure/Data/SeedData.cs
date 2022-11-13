using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Data
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new DataContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<DataContext>>()))
            {
                // Look for any movies.
                if (context.Trips.Any())
                {
                    return;   // DB has been seeded
                }
                context.Trips.AddRange(
                    new Trip
                    {
                        Name = "Kelowna Trip",
                        Description = "The one where we all went to Kelwona",
                        TotalExpense = 0
                    },
                    new Trip
                    {
                        Name = "Victoria Trip",
                        Description = "The one where we all went to Victoria",
                        TotalExpense = 0
                    }
                );
                await context.SaveChangesAsync();
            }
        }
    }
}