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

                DateTime now = DateTime.UtcNow;

                if(appUser.CurrentStreak == 0)
                {
                    appUser.currentDailyDate = now;
                    appUser.StreakIncremented = false;
                }

                if (appUser.StreakIncremented == false)
                {
                    appUser.CurrentStreak++;
                    appUser.currentDailyDate = now;
                    appUser.StreakIncremented = true;

                }

                if(now > appUser.currentDailyDate.AddSeconds(15) && now < appUser.currentDailyDate.AddMinutes(30))
                {
                    appUser.StreakIncremented = false;
                }
                
                if(now > appUser.currentDailyDate.AddSeconds(30))
                {
                    appUser.CurrentStreak = 1;
                    appUser.currentDailyDate = now;
                    appUser.StreakIncremented = true;
                }




                await _userManager.UpdateAsync(appUser);

           

      

                if (appUser == null)
                {
                    return NotFound();
                }

                var result = new
                {
                    appUser.Email,
                    appUser.FullName,
                    appUser.Height,
                    appUser.Gender,
                    appUser.CurrentWeight,
                    appUser.TargetWeight,
                    appUser.activityLevel,
                    appUser.difficultyLevel,
                    appUser.CurrentCalories,
                    appUser.DailyCalories,
                    appUser.CurrentProtein,
                    appUser.DailyProtein,
                    appUser.CurrentCarbs,
                    appUser.DailyCarbs,
                    appUser.CurrentFat,
                    appUser.DailyFat,
                    appUser.FirsTimeOrNot,
                    appUser.CurrentWater,
                    appUser.currentDailyDate,
                    appUser.StreakIncremented,
                    appUser.CurrentStreak,
                    appUser.Age,
                    appUser.DailyWater,
                    appUser.Id,
                };

                return result;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // PUT: api/AppUser/5
        [HttpPut("me")]
        [Authorize("User")]
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

              


                user.Email = appUser.Email;
                user.FullName = appUser.FullName;
                user.Height = appUser.Height;
                user.Gender = appUser.Gender;
                user.CurrentWeight = appUser.CurrentWeight;
                user.TargetWeight = appUser.TargetWeight;
                user.activityLevel = appUser.activityLevel;
                user.difficultyLevel = appUser.difficultyLevel;
                user.CurrentCalories += appUser.CurrentCalories;
                user.DailyCalories = appUser.DailyCalories;
                user.CurrentProtein += appUser.CurrentProtein;
                user.DailyProtein = appUser.DailyProtein;
                user.CurrentCarbs += appUser.CurrentCarbs;
                user.DailyCarbs = appUser.DailyCarbs;
                user.CurrentFat += appUser.CurrentFat;
                user.DailyFat = appUser.DailyFat;
                user.CurrentWater += appUser.CurrentWater;
                user.FirsTimeOrNot = appUser.FirsTimeOrNot;
                user.CurrentStreak += appUser.CurrentStreak;
                user.currentDailyDate = appUser.currentDailyDate;
                user.DailyWater = appUser.DailyWater;
                user.Age = appUser.Age;
                //missing DailyWater!!!!!!
                await _userManager.UpdateAsync(user);
            
                return NoContent();
            }
            
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

         // PUT: api/AppUser/5
        [HttpPut("me/GoalPage")]
        [Authorize("User")]
        public async Task<IActionResult> PutAppUserGoalPage( int TargetWeight, int activityLevel, int difficultyLevel, int DailyWater)
        {
            try
            {
                var userName = User.FindFirstValue(ClaimTypes.Name);

                var user = await _userManager.FindByNameAsync(userName);

                if (user == null)
                {
                    return NotFound();
                }


                user.TargetWeight = TargetWeight;
                user.activityLevel = activityLevel;
                user.difficultyLevel = difficultyLevel;
                user.DailyWater = DailyWater;

                await _userManager.UpdateAsync(user);
            
                return NoContent();
            }
            
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        //update daily intake
        [HttpPut("updateDailyIntake")]
        [Authorize("User")]
        public async Task<IActionResult> UpdateDailyIntake(float calories, float protein, float carbs, float fat, int water)
        {
            try
            {
                var userName = User.FindFirstValue(ClaimTypes.Name);

                var user = await _userManager.FindByNameAsync(userName);

                if (user == null)
                {
                    return NotFound();
                }

                if(user.CurrentWater == null) 
                {
                    user.CurrentWater = 0;
                }

                user.CurrentCalories += calories;
                user.CurrentProtein += protein;
                user.CurrentCarbs += carbs;
                user.CurrentFat += fat;
                user.CurrentWater += water;
                
                await _userManager.UpdateAsync(user);

                return NoContent();
            }

            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        //update daily intake
        [HttpPut("UpdateInfo")]
        [Authorize("User")]
        public async Task<IActionResult> UpdateInfo(string Gender, float CurrentWeight, int Age, float Height)
        {
            try
            {
                var userName = User.FindFirstValue(ClaimTypes.Name);

                var user = await _userManager.FindByNameAsync(userName);

                if (user == null)
                {
                    return NotFound();
                }

                user.CurrentWeight = CurrentWeight;
                user.Height = Height;
                user.Age    = Age;
                user.Gender = Gender;
     

                await _userManager.UpdateAsync(user);

                return NoContent();
            }

            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        //reset daily intake
        [HttpPut("resetDailyIntake")]
        [Authorize("User")]
        public async Task<IActionResult> ResetDailyIntake()
        {
            try
            {
                var userName = User.FindFirstValue(ClaimTypes.Name);

                var user = await _userManager.FindByNameAsync(userName);

                if (user == null)
                {
                    return NotFound();
                }

                user.CurrentCalories = 0;
                user.CurrentProtein = 0;
                user.CurrentCarbs = 0;
                user.CurrentFat = 0;
                user.CurrentWater = 0;

                await _userManager.UpdateAsync(user);

                return NoContent();
            }

            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //update daily intake
        [HttpPut("UpdateFirstTimeOrNot")]
        [Authorize("User")]
        public async Task<IActionResult> UpdateFirsTimeOrNot(int number)
        {
            try
            {
                var userName = User.FindFirstValue(ClaimTypes.Name);

                var user = await _userManager.FindByNameAsync(userName);

                if (user == null)
                {
                    return NotFound();
                }

                if (number != 1 && number != 0)
                {
                    return (BadRequest("has to be set to 1 or 0"));
                }

                user.FirsTimeOrNot = number;

                await _userManager.UpdateAsync(user);

                return NoContent();
            }

            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        //fill out form 
        [HttpPut("FillOutForm")]
        [Authorize("User")]
        public async Task<IActionResult> FillOutForm(string Gender, double Height, double TargetWeight, double Weight, int avtivityLevel, int difficultyLevel, int DailyWater, int age)
        {
            try
            {
                var userName = User.FindFirstValue(ClaimTypes.Name);

                var user = await _userManager.FindByNameAsync(userName);

                if (user == null)
                {
                    return NotFound();
                }
               
                user.Height = Height;
                user.Gender = Gender;
                user.TargetWeight = TargetWeight;
                user.CurrentWeight = Weight;
                user.activityLevel = avtivityLevel;
                user.difficultyLevel = difficultyLevel;
                user.DailyWater = DailyWater;
                user.Age = age;
                user.FirsTimeOrNot = 1;
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
        [Authorize("AdminOnly")]
        public async Task<ActionResult<AppUser>> PostAppUser(AppUser appUser)
        {
            db.Users.Add(appUser);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetAppUser", new { id = appUser.Id }, appUser);
        }

        // DELETE: api/AppUser/5
        [HttpDelete("{id}")]
        [Authorize("AdminOnly")]
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

    }
}