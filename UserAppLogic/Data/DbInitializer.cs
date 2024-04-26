using System;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using UserBackend.Data.Models;
using Microsoft.Extensions.Configuration;

namespace UserAppLogic.Data
{
    public static class DbInitializer
    {   
        public static void SeedUsers(UserManager<AppUser> userManager, IConfiguration configuration)
        {
            if (userManager == null)
                throw new ArgumentNullException(nameof(userManager));

            // Get values from configuration
            var adminEmail = configuration["Admin:adminEmail"];
            var adminPassword = configuration["Admin:adminPassword"];
            var userEmail = configuration["User:userEmail"];
            var userPassword = configuration["User:userPassword"];

            // Seed admin user
            if (userManager.FindByNameAsync(adminEmail).Result == null)
            {
                var adminUser = new AppUser { UserName = adminEmail, Email = adminEmail, EmailConfirmed = true };
                var result = userManager.CreateAsync(adminUser, adminPassword).Result;

                if (!result.Succeeded)
                {
                    throw new Exception("Failed to create admin user: " + result.Errors.First().Description);
                }

                var claim = new Claim("IsAdmin", "true");
                userManager.AddClaimAsync(adminUser, claim).Wait();
            }

            // Seed normal user
            if (userManager.FindByNameAsync(userEmail).Result == null)
            {
                var user = new AppUser { UserName = userEmail, Email = userEmail, EmailConfirmed = true };
                var result = userManager.CreateAsync(user, userPassword).Result;

                if (!result.Succeeded)
                {
                    throw new Exception("Failed to create user: " + result.Errors.First().Description);
                }

                var claim = new Claim("IsUser", "true");
                userManager.AddClaimAsync(user, claim).Wait();
            }
        }
    }
}
