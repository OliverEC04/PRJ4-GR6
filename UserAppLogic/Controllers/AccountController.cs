using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using UserBackend.Data;
using UserBackend.Data.Models;
using UserAppLogic.DTO;

namespace AppUserBackend.Controllers
{
    public class AccountController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly ILogger<AccountController> _logger;
        private readonly IConfiguration _configuration;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountController(
                MyDbContext db,
                ILogger<AccountController> logger,
                IConfiguration configuration,
                UserManager<AppUser> userManager,
                SignInManager<AppUser> signInManager)
        {
            _db = db;
            _logger = logger;
            _configuration = configuration;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public async Task<ActionResult> Register(RegisterDTO input)
        {
            try
            {
                var newUser = new AppUser();
                newUser.UserName = input.Email;
                newUser.Email = input.Email;
                newUser.FullName = input.FullName;
                var result = await _userManager.CreateAsync(
                    newUser, input.Password);
                if (result.Succeeded)
                {
                    _logger.LogInformation("User {userName} ({email}) created a new account", newUser.UserName, newUser.Email);
                    return StatusCode(201,
                    $"User '{newUser.UserName}' created successfully");
                }
                else 
                {
                    throw new Exception(string.Format("Error: {0}", string.Join(" ",
                    result.Errors.Select(e => e.Description))));
                }
            }
            else
            {
                
            }
        }
    }
}