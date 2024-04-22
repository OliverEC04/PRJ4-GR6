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

            if (userManager == null)
                throw new ArgumentNullException(nameof(userManager));
            if (userManager.FindByNameAsync(adminEmail).Result == null)
            {
                var user = new AppUser();
                user.UserName = adminEmail;
                user.Email = adminEmail;
                user.EmailConfirmed = true;
                IdentityResult result = userManager.CreateAsync(user, adminPassword).Result;
                if (!result.Succeeded)
                {
                    throw new Exception("Failed to create admin user: " + result.Errors.First().Description);
                }
                else
                {
                var adminUser = userManager.FindByNameAsync(adminEmail).Result;
                var claim = new Claim("IsAdmin", "true");
                var claimAdded = userManager.AddClaimAsync(adminUser, claim).Result;
                }
            }
        }
    }
}