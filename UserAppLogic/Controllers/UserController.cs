using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using UserBackend.Data.Models;
using UserBackend.Data;

namespace UserBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        private readonly MyDbContext db;

        public UserController(MyDbContext context)
        {
            db = context;
        }

        // GET: /YourControllerName
        [HttpGet("GetUsers")]
        public IActionResult Get()
        {
            var users = db.Users.ToList();
            return Ok(users);
        }

        // POST: /YourControllerName
        [HttpPost("AddUser")]
        public IActionResult AddUser([FromBody] User UserModel)
        {
            User newUser = new User
            {
                Name = UserModel.Name,
                Email = UserModel.Email,
                DateOfBirth = UserModel.DateOfBirth,
                Password = UserModel.Password
            };
            db.Users.Add(newUser);
            db.SaveChanges();
            return Ok("Created user with data: " + newUser.ToString());
        }

        // PUT: /YourControllerName/{id}
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User UserModel)
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