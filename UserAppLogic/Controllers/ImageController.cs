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
            try
            {
                using (var dataStream = new MemoryStream())
                {
                    var userName = User.FindFirstValue(ClaimTypes.Name);
        
                    if (userName == null)
                    {
                        return NotFound("Username not found in claims.");
                    }
        
                    var appUser = await _userManager.FindByNameAsync(userName);
        
                    if (appUser == null)
                    {
                        return NotFound("User not found in database.");
                    }
                    await image.CopyToAsync(dataStream);
                    byte[] imageData = dataStream.ToArray();
        
                    // Create a new Image entity and set its properties
                    if (appUser.Image != null)
                    {
                        // Update the existing image
                        appUser.Image.Data = imageData;
                        appUser.Image.ContentType = image.ContentType;
                        appUser.Image.Name = image.FileName;
                    }
                    else
                    {
                        // Create a new Image entity and set its properties
                        ImageEntity imageEntity = new ImageEntity
                        {
                            Data = imageData,
                            ContentType = image.ContentType,
                            Name = image.FileName,
                            AppUserId = appUser.Id,
                            AppUser = appUser
                        };
        
                        // Add the new Image entity in your DbContext
                        appUser.Image = imageEntity;
                        db.Images.Add(imageEntity);
                    }
        
                    // Save the changes in your DbContext
                    await db.SaveChangesAsync();
                    return StatusCode(201, $"Image has been uploaded.");
                }
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine(ex);
                return StatusCode(500, "An error occurred while saving the image.");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImage(string id)
        {
            // Log the user ID
            Console.WriteLine($"User ID: {id}");
        
            // Retrieve the Image entity from the database
            var user = await _userManager.FindByIdAsync(id);
        
            // Log the result of FindByIdAsync
            Console.WriteLine($"FindByIdAsync result: {user}");
        
            if (user == null)
            {
                return NotFound();
            }
            
            ImageEntity? imageEntity = user.Image;
        
            // Log the ImageEntity associated with the user
            Console.WriteLine($"ImageEntity: {imageEntity}");
        
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