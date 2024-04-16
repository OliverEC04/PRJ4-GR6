using BarcodeAPI.Data;
using BarcodeAPI.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BarcodeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class BarcodeController : ControllerBase
    {
        private readonly BarcodeAPIDbContext _context;

        public BarcodeController(BarcodeAPIDbContext context)
        {
            _context = context;
        }

        // GET api/barcode/GetBarcodeInfo/{EAN}
        [HttpGet("GetBarcodeInfo/{EAN}")]
        public ActionResult<Barcode> GetBarcodeInfo(long EAN)
        {
            var barcode = _context.Barcode.FirstOrDefault(b => b.id == EAN);
            if (barcode == null)
            {
                return NotFound();
            }
            return Ok(barcode);
        }

        // POST api/barcode/AddBarcode
        [HttpPost("AddBarcode")]
        public ActionResult<Barcode> AddBarcode([FromBody] Barcode barcode)
        {
            if (string.IsNullOrEmpty(barcode.MealName))
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Barcode.Add(barcode);


            _context.Database.OpenConnection();
            try
            {
                _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Barcode ON");
                _context.SaveChanges();
                _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Barcode ON");
            }
            finally
            {
                _context.Database.CloseConnection();
            }


            return Ok();
        }
    }
}