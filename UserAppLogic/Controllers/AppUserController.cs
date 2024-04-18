using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using UserBackend.Data.Models;
using UserBackend.Data;
using Microsoft.AspNetCore.Authorization;

namespace AppUserBackend.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class AppUserController : ControllerBase
    {
        private readonly MyDbContext db;

        public AppUserController(MyDbContext context)
        {
            db = context;
        }

        // GET: /YourControllerName
        [HttpGet("GetAppUsers")]
        public IActionResult Get()
        {
            var AppUsers = db.Users.ToList();
            return Ok(AppUsers);
        }

        // POST: /YourControllerName
        /*[HttpPost("AddAppUser")]
        public IActionResult AddAppUser([FromBody] AppUser AppUserModel)
        {
            AppUser newAppUser = new AppUser
            {
                FullName = AppUserModel.FullName,
                Email = AppUserModel.Email,
                DateOfBirth = AppUserModel.DateOfBirth,
                Password = AppUserModel.Password
            };
            db.Users.Add(newAppUser);
            db.SaveChanges();
            return Ok("Created AppAppUser with data: " + newAppUser.ToString());
        }*/

        // PUT: /YourControllerName/{id}
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] AppUser AppUserModel)
        {
            // Your code here
            return NoContent();
        }

        // DELETE: /YourControllerName/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Your code here
            return NoContent();
        }
    }
}