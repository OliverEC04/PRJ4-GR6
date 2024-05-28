using BarcodeAPI.Controllers;
using BarcodeAPI.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using UserBackend.Data;
using UserBackend.Data.Models;

namespace UnitTestingWebApi
{
    public class BarcodeAPITest
    {
        private MyDbContext _context;
        private Mock<UserManager<AppUser>> _mockUserManager;
        private BarcodeController _controller;
        private AppUser _appUser;

        [SetUp]
        public void Setup()
        {
            // Use in-memory database
            var options = new DbContextOptionsBuilder<MyDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _context = new MyDbContext(options);

            // Make sure it's a new database
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            // Mock UserManager
            var store = new Mock<IUserStore<AppUser>>();
            _mockUserManager = new Mock<UserManager<AppUser>>(store.Object, null, null, null, null, null, null, null, null);

            _appUser = new AppUser { UserName = "testuser", Barcodes = new List<Barcode>() };
            _mockUserManager.Setup(um => um.FindByNameAsync(It.IsAny<string>())).ReturnsAsync(_appUser);

            // Set up the HttpContext to mock the ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, "testuser")
            }));

            var context = new DefaultHttpContext { User = user };

            // Initialize controller with mocked dependencies
            _controller = new BarcodeController(_context, _mockUserManager.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = context
                }
            };
        }

        [Test]
        public async Task TestAddingMealWithAddBarcodeAndTestItsThere()
        {
            // Arrange
            var barcode = new Barcode
            {
                BarcodeId = 123289,
                MealName = "apple",
                Calories = 219,
                Protein = 218,
                Carbs = 29,
                Fat = 129
            };

            var barcode2 = new Barcode
            {
                BarcodeId = 1232892,
                MealName = "apple2",
                Calories = 219,
                Protein = 218,
                Carbs = 29,
                Fat = 129
            };

            // Act
            var result = await _controller.AddMealWithBarcode(barcode.BarcodeId, barcode.MealName, barcode.Calories, barcode.Protein, barcode.Carbs, barcode.Fat);
            var result2 = await _controller.AddMealWithBarcode(barcode2.BarcodeId, barcode2.MealName, barcode2.Calories, barcode2.Protein, barcode2.Carbs, barcode2.Fat);

            // Assert
            Assert.AreEqual(2, _context.Barcode.Count());

            var addedBarcode1 = await _context.Barcode.FirstOrDefaultAsync(b => b.BarcodeId == barcode.BarcodeId);
            var addedBarcode2 = await _context.Barcode.FirstOrDefaultAsync(b => b.BarcodeId == barcode2.BarcodeId);

            Assert.AreEqual(barcode.MealName, addedBarcode1.MealName);
            Assert.AreEqual(barcode2.MealName, addedBarcode2.MealName);
        }



        [Test]
        public async Task TestAddMealWithNoBarcodeAndTestItsThere()
        {
            // Arrange
            var mealName = "banana";
            var calories = 105;
            var protein = 1;
            var carbs = 27;
            var fat = 0.3f;

            // Act
            var result = await _controller.AddMealWithNoBarcode(mealName, calories, protein, carbs, fat);

            // Assert
            Assert.AreEqual(1, _context.Barcode.Count(), "The barcode was not added to the database.");

            var addedBarcode = await _context.Barcode.FirstOrDefaultAsync(b => b.MealName == mealName);
            Assert.AreEqual(mealName, addedBarcode.MealName);
            Assert.AreEqual(calories, addedBarcode.Calories);
            Assert.AreEqual(protein, addedBarcode.Protein);
            Assert.AreEqual(carbs, addedBarcode.Carbs);
            Assert.AreEqual(fat, addedBarcode.Fat);
        }

        [Test]
        public async Task TestRemoveBarcode()
        {
            // Arrange
            var barcode = new Barcode
            {
                BarcodeId = 123289,
                MealName = "apple",
                Calories = 219,
                Protein = 218,
                Carbs = 29,
                Fat = 129,
                AppUserId = _appUser.Id
            };
            _context.Barcode.Add(barcode);
            _appUser.Barcodes.Add(barcode);
            _context.SaveChanges();

            // Act
            var result = await _controller.RemoveBarcode(barcode.Id);

            // Assert
            Assert.IsNull(await _context.Barcode.FirstOrDefaultAsync(b => b.Id == barcode.Id), "The barcode was not removed from the database.");
            Assert.AreEqual(0, _context.Barcode.Count(), "The barcode count in the database is not zero.");
        }
    }
}
