using Microsoft.AspNetCore.Mvc;
using UserBackend.Data.Models;

namespace UserBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        // GET: /YourControllerName
        [HttpGet]
        public IActionResult Get()
        {
            // Your code here
            return Ok("Hello, World!");
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
            // Your code here
            return Ok("Created user with data: " + newUser);
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