using System;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using UserBackend.Data.Models;

namespace UserAppLogic.Data
{
    public static class DbInitializer
    {
        public static void SeedUsers(UserManager<AppUser> userManager)
        {
            const string adminEmail = "Admin@localhost";
            const string adminPassword = "Secret7$";
            const string userEmail = "User@localhost";
            const string userPassword = "Secret6$";

            if (userManager == null)
                throw new ArgumentNullException(nameof(userManager));

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
