using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context) { 
            if (context.Activities.Any()) return;

            var activities = new List<Activity> { 
                new Activity
                {
                    Title = "Past activity 1",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Activity 2 months ago",
                    Category = "drinks",
                    Venue="Pub",
                    City="Maringá",
                },
                new Activity
                {
                    Title = "Past activity 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Activity 1 months ago",
                    Category = "travel",
                    Venue="Somewhere on the Thames",
                    City="London",
                },
                new Activity
                {
                    Title = "Past activity 3",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "Activity 1 months in future",
                    Category = "filme",
                    Venue="Cinema",
                    City="Maringá",
                },
            };

            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}