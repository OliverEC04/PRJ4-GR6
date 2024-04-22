using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using UserBackend.Data;
using UserBackend.Data.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace AppUserBackend.Controllers
    {
        [Authorize]
        [ApiController]
        [Route("[controller]")]
        public class SeedController : ControllerBase
        {
            private readonly MyDbContext _db;
            private readonly ILogger<SeedController> _logger;
            private readonly IConfiguration _configuration;
            private readonly string _signingKey;
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            public SeedController(
                    MyDbContext db,
                    ILogger<SeedController> logger,
                    IConfiguration configuration,
                    UserManager<AppUser> userManager,
                    SignInManager<AppUser> signInManager)
            {
                _db = db;
                _logger = logger;
                _configuration = configuration;
                _userManager = userManager;
                _signInManager = signInManager;
                _signingKey = _configuration["SigningKeys:Default"];
            }


            [HttpPut(Name = "SeedUsers")]
            [ResponseCache(NoStore = true)]
            public async Task<IActionResult> Put()
            {
                var seededUsers = 0;

                var adminUser = new AppUser
                {
                    UserName = "Admin",
                    Email = "admin@webapi.com",
                    FullName = "Admin Adminsen"
                };

                if (_userManager.FindByEmailAsync(adminUser.Email).Result == null)
                {
                    var userResult = _userManager.CreateAsync(adminUser, "YourStrongPassword1!").Result;

                    if (!userResult.Succeeded)
                        throw new Exception(userResult.ToString());

                    //Add superUser  Claim
                    var roleResult = _userManager.AddClaimAsync(adminUser, new Claim("IsAdmin", "true")).Result;

                    if (!roleResult.Succeeded)
                        throw new Exception(roleResult.ToString());

                    seededUsers++;
                }

                var regUser = new AppUser
                {
                    UserName = "Registered",
                    Email = "registered@webapi.com",
                    FullName = "Registered Registeredsen"
                };

                if (_userManager.FindByEmailAsync(regUser.Email).Result == null)
                {
                    var userResult = _userManager.CreateAsync(regUser, "YourStrongPassword1!").Result;

                    if (!userResult.Succeeded)
                        throw new Exception(userResult.ToString());

                seededUsers++;
                }
            
            return new JsonResult(new {SeededUsers = seededUsers});
            }
            
        }
    }
