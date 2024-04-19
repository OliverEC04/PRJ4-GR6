using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using UserBackend.Data;
using UserBackend.Data.Models;
using UserAppLogic.DTO;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace AppUserBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly ILogger<AccountController> _logger;
        private readonly IConfiguration _configuration;
        private readonly string _signingKey;
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
            _signingKey = _configuration["SigningKeys:Default"];
        }

        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult> Register(RegisterDTO input)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newUser = new AppUser();

                    newUser.UserName = input.Email;
                    newUser.Email = input.Email;
                    newUser.FullName = input.FullName;
                    
                    var result = await _userManager.CreateAsync(newUser, input.Password);

                    if (result.Succeeded)
                    {
                        _logger.LogInformation(
                        "User {userName} ({email}) has been created.",
                        newUser.UserName, newUser.Email);
                        return StatusCode(201,
                        $"User '{newUser.UserName}' has been created.");
                    }
                    else
                        throw new Exception(
                        string.Format("Error: {0}", string.Join(" ",
                        result.Errors.Select(e => e.Description))));
                }
                else
                {
                    var details = new ValidationProblemDetails(ModelState);
                    details.Type =
                    "https:/ /tools.ietf.org/html/rfc7231#section-6.5.1";
                    details.Status = StatusCodes.Status400BadRequest;
                    return new BadRequestObjectResult(details);
                }
            }
            catch (Exception e)
            {
                var exceptionDetails = new ProblemDetails();
                exceptionDetails.Detail = e.Message;
                exceptionDetails.Status =
                StatusCodes.Status500InternalServerError;
                exceptionDetails.Type =
                "https:/ /tools.ietf.org/html/rfc7231#section-6.6.1";
                return StatusCode(
                StatusCodes.Status500InternalServerError,
                exceptionDetails);
            }
        }

        [HttpPost]
        [Route("Login")] 
        public async Task<ActionResult> Login(LoginDTO input)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = await _userManager.FindByNameAsync(input.UserName);
                    if (user == null || !await _userManager.CheckPasswordAsync(user, input.Password))
                        throw new Exception("Invalid login attempt.");
                    else
                    {
                        var signingCredentials = new SigningCredentials(
                                new SymmetricSecurityKey(
                                System.Text.Encoding.UTF8.GetBytes(_configuration["SigningKeys:Default"])),
                                SecurityAlgorithms.HmacSha256);

                        var claims = new List<Claim>();
                        claims.Add(new Claim(ClaimTypes.Name, user.UserName));

                        var jwtObject = new JwtSecurityToken(
                                issuer: _configuration["JWT:Issuer"],
                                audience: _configuration["JWT:Audience"],
                                claims: claims,
                                expires: DateTime.Now.AddSeconds(300),
                                signingCredentials: signingCredentials);
                        var jwtString = new JwtSecurityTokenHandler()
                        .WriteToken(jwtObject);
                        
                        return StatusCode(StatusCodes.Status200OK, jwtString);
                    }
                }
                else
                {
                    var details = new ValidationProblemDetails(ModelState);
                    details.Type =
                    "https:/ /tools.ietf.org/html/rfc7231#section-6.5.1";
                    details.Status = StatusCodes.Status400BadRequest;
                    return new BadRequestObjectResult(details);
                }
            }
            catch (Exception e)
            {
                var exceptionDetails = new ProblemDetails();
                exceptionDetails.Detail = e.Message;
                exceptionDetails.Status =
                StatusCodes.Status401Unauthorized;
                exceptionDetails.Type =
                "https:/ /tools.ietf.org/html/rfc7231#section-6.6.1";
                return StatusCode(
                    StatusCodes.Status401Unauthorized, exceptionDetails);
            }
        }
    }
}