using Microsoft.AspNetCore.Mvc;
using UserBackend.Data;
using UserBackend.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using System.IO;
using BarcodeAPI.Data.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


namespace AppUserBackend.Controllers
{
    [Authorize("User")]
    [Route("[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ImageController : ControllerBase
    {
        private readonly MyDbContext db;
        private readonly UserManager<AppUser> _userManager;


        public ImageController(MyDbContext _context, UserManager<AppUser> userManager)
        {
            db = _context;
            _userManager = userManager;

        }

        // GET: api/Image
        [HttpPost]
        public async Task<IActionResult> SaveImage(IFormFile image)
        {
            using (var dataStream = new MemoryStream())
            {
                var userName = User.FindFirstValue(ClaimTypes.Name);

                if (userName == null)
                {
                    return NotFound();
                }

                var appUser = await _userManager.FindByNameAsync(userName);

                if (appUser == null)
                {
                    return NotFound();
                }
                await image.CopyToAsync(dataStream);
                byte[] imageData = dataStream.ToArray();

                // Create a new Image entity and set its properties
                ImageEntity imageEntity = new ImageEntity
                {
                    Data = imageData,
                    ContentType = image.ContentType,
                    Name = image.FileName,
                    AppUserId = appUser.Id
                };

                // Add and save the new Image entity in your DbContext
                appUser.Image = imageEntity;
                db.Images.Add(imageEntity);
                await db.SaveChangesAsync();
                return StatusCode(201,
                        $"Image has been uploaded.");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImage(string id)
        {
            // Retrieve the Image entity from the database
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            
            ImageEntity? imageEntity = user.Image;

            // If the Image entity is not found, return a 404 Not Found response
            if (imageEntity == null)
            {
                return NotFound();
            }

            // Get the currently authenticated user
            var userName = User.FindFirstValue(ClaimTypes.Name);

            if (userName == null)
            {
                return NotFound();
            }

            var appUser = await _userManager.FindByNameAsync(userName);

            if(appUser == null)
            {
                return NotFound();
            }

            // If the AppUserId of the image does not match the Id of the authenticated user, return a 403 Forbidden response
            if (imageEntity.AppUserId != appUser.Id)
            {
                return Forbid();
            }

            // Return the image data as a file with the specified content type
            return File(imageEntity.Data, imageEntity.ContentType);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteImage()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);

            if (userName == null)
            {
                return NotFound();
            }

            var appUser = await _userManager.FindByNameAsync(userName);

            if (appUser == null)
            {
                return NotFound();
            }

            ImageEntity? imageEntity = appUser.Image;

            if (imageEntity == null)
            {
                return NotFound();
            }

            appUser.Image = null;
            db.Images.Remove(imageEntity);
            await db.SaveChangesAsync();

            return Ok();
        }
    }
}