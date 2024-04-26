using BarcodeAPI.Data;
using BarcodeAPI.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using UserBackend.Data;
using UserBackend.Data.Models;

namespace BarcodeAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class BarcodeController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly UserManager<AppUser> _userManager;

        public BarcodeController(MyDbContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET api/barcode/GetBarcodeInfo/{EAN}
        [HttpGet("GetBarcodeInfo/{EAN}")]
        public ActionResult<Barcode> GetBarcodeInfo(long EAN)
        {
            var barcode = _context.Barcode.FirstOrDefault(b => b.BarcodeId == EAN);
            if (barcode == null)
            {
                return NotFound();
            }
            return Ok(barcode);
        }


        // Get list of barcode for a specific user

        [HttpGet("ListOfBarcodesForUser")]

        public async Task<ActionResult<object>> GetListOfBarcodesForUser()

        {

            try
            {
                var userName = User.FindFirstValue(ClaimTypes.Name);

                var appUser = await _userManager.FindByNameAsync(userName);

                if (appUser == null)
                {
                    return NotFound();
                }


                var result = _context.Barcode

                    .Where(b => b.AppUser.FullName == userName && b.BarcodeId != 0)

                    .ToList();


                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

       
        // POST api/barcode/AddBarcode
        [HttpPost("AddMealWithBarcode")]
        public ActionResult<Barcode> AddMealWithBarcode(long barcodeId, string mealName, float calories, float protein, float carbs, float fat)
        {

            if (string.IsNullOrEmpty(mealName))
            {
                return BadRequest("Meal name cannot be empty.");
            }

            var barcode = new Barcode
            {
                BarcodeId = barcodeId,
                MealName = mealName,
                Calories = calories,
                Protein = protein,
                Carbs = carbs,
                Fat = fat
            };

            _context.Barcode.Add(barcode);
            _context.SaveChanges();

            return Ok();

        }

        // POST api/barcode/AddBarcodeNoId
        [HttpPost("AddMealWithNoBarcode")]
        public ActionResult<Barcode> AddMealWithNoBarcode(string mealName, float calories, float protein, float carbs, float fat)
        {
            if (string.IsNullOrEmpty(mealName))
            {
                return BadRequest("Meal name cannot be empty.");
            }

            var barcode = new Barcode
            {
                BarcodeId = 0,
                MealName = mealName,
                Calories = calories,
                Protein = protein,
                Carbs = carbs,
                Fat = fat
            };

            _context.Barcode.Add(barcode);
            _context.SaveChanges();

            return Ok();
        }


        // DELETE api/barcode/RemoveBarcode/{id}
        [HttpDelete("RemoveBarcode/{id}")]
        public ActionResult RemoveBarcode(long id)
        {
            var barcode = _context.Barcode.FirstOrDefault(b => b.Id == id);
            if (barcode == null)
            {
                return NotFound();
            }

            _context.Barcode.Remove(barcode);
            _context.SaveChanges();

            return Ok();
        }




    }
}