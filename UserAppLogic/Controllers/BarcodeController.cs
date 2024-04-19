using BarcodeAPI.Data;
using BarcodeAPI.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using UserBackend.Data;

namespace BarcodeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class BarcodeController : ControllerBase
    {
        private readonly MyDbContext _context;

        public BarcodeController(MyDbContext context)
        {
            _context = context;
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

        // Get list of barcode
        [HttpGet("ListOfBarcodes")]
        public ActionResult<IEnumerable<Barcode>> GetListOfBarcodes()
        {
            var barcodes = _context.Barcode.ToList();
            return Ok(barcodes);
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
            var barcode = _context.Barcode.FirstOrDefault(b => b.id == id);
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