using Microsoft.AspNetCore.Mvc;
using UserBackend.Data;
using UserBackend.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using UserBackend.Data.DTO;

namespace AppUserBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class AppUserController : ControllerBase
    {
        private readonly MyDbContext db;
        private readonly ILogger<AppUserController> logger;
        private readonly UserManager<AppUser> _userManager;


        public AppUserController(MyDbContext context, ILogger<AppUserController> logger, UserManager<AppUser> userManager)
        {
            db = context;
            this.logger = logger;
            _userManager = userManager;

        }


        // GET: api/AppUser
        [HttpGet]
        [Authorize("AdminOnly")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetAppUsers()
        {
            return await db.Users.ToListAsync();
        }

        
        [HttpGet("me")]
        [Authorize("User")]
        public async Task<ActionResult<object>> GetAppUserData()
        {
            try
            {
                var userName = User.FindFirstValue(ClaimTypes.Name);

                var appUser = await _userManager.FindByNameAsync(userName);

                if (appUser == null)
                {
                    return NotFound();
                }

                var result = new 
                {
                    appUser.FullName,
                    appUser.Height,
                    appUser.CurrentWeight,
                    appUser.TargetWeight,
                    appUser.Age,
                    appUser.Gender,
                    appUser.DailyCalories,
                    appUser.DailyProtein,
                    appUser.DailyCarbs,
                    appUser.DailyFat,
                    appUser.CurrentCalories
                };

                return result;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
}



        // PUT: api/AppUser/5
        [Authorize("User")]
        [HttpPut("me")]
        public async Task<IActionResult> PutAppUser(AppUserDTO appUser)
        {
            try
            {
                var userName = User.FindFirstValue(ClaimTypes.Name);

                var user = await _userManager.FindByNameAsync(userName);

                if (user == null)
                {
                    return NotFound();
                }

                user.FullName = appUser.FullName;
                user.Height = appUser.Height;
                user.CurrentWeight = appUser.CurrentWeight;
                user.TargetWeight = appUser.TargetWeight;
                user.Age = appUser.Age;
                user.Gender = appUser.Gender;
                user.DailyCalories = appUser.DailyCalories;
                user.DailyProtein = appUser.DailyProtein;
                user.DailyCarbs = appUser.DailyCarbs;
                user.DailyFat = appUser.DailyFat;
                user.CurrentCalories = appUser.CurrentCalories;
            
                await _userManager.UpdateAsync(user);
            
                return NoContent();
            }
            
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST: api/AppUser
        [HttpPost]
        public async Task<ActionResult<AppUser>> PostAppUser(AppUser appUser)
        {
            db.Users.Add(appUser);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetAppUser", new { id = appUser.Id }, appUser);
        }

        // DELETE: api/AppUser/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppUser(string id)
        {
            var appUser = await db.Users.FindAsync(id);
            if (appUser == null)
            {
                return NotFound();
            }

            db.Users.Remove(appUser);
            await db.SaveChangesAsync();

            return NoContent();
        }

        private bool AppUserExists(string id)
        {
            return db.Users.Any(e => e.Id == id);
        }
    }
}