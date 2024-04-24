using Microsoft.AspNetCore.Mvc;
using UserBackend.Data;
using UserBackend.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;

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
                    appUser.Gender
                };

                return result;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
}



        // PUT: api/AppUser/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppUser(string id, AppUser appUser)
        {
            if (id != appUser.Id)
            {
                return BadRequest();
            }

            db.Entry(appUser).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
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