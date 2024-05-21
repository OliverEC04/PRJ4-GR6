using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using UserBackend.Data;
using UserBackend.Data.Models;
using AppUserBackend.Controllers;
using UserBackend.Data.DTO;
using BarcodeAPI.Data.Models;

namespace UnitTestingWebApi
{
    public class AppUserControllerTests
    {
        private MyDbContext _context;
        private Mock<UserManager<AppUser>> _mockUserManager;
        private Mock<ILogger<AppUserController>> _mockLogger;
        private AppUserController _controller;
        private AppUser _appUser;

        [SetUp]
        public void Setup()
        {
            // Use in-memory database
            var options = new DbContextOptionsBuilder<MyDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _context = new MyDbContext(options);

            // Seed data if necessary
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            // Mock UserManager
            var store = new Mock<IUserStore<AppUser>>();
            _mockUserManager =
                new Mock<UserManager<AppUser>>(store.Object, null, null, null, null, null, null, null, null);
            _mockLogger = new Mock<ILogger<AppUserController>>();

            _appUser = new AppUser
            {
                UserName = "testuser",
                Email = "testuser@example.com",
                CurrentStreak = 0,
                currentDailyDate = DateTime.Now,
                currentResetDate = DateTime.Now.Date,
                Barcodes = new List<Barcode>()
            };

            _mockUserManager.Setup(um => um.FindByNameAsync(It.IsAny<string>())).ReturnsAsync(_appUser);
            _mockUserManager.Setup(um => um.UpdateAsync(It.IsAny<AppUser>())).ReturnsAsync(IdentityResult.Success);

            // Set up the HttpContext to mock the ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, "testuser")
            }));

            var context = new DefaultHttpContext { User = user };

            // Initialize controller with mocked dependencies
            _controller = new AppUserController(_context, _mockLogger.Object, _mockUserManager.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = context
                }
            };
        }

        [Test]
        public async Task PutAppUserGoalPage_UpdatesUserGoals()
        {
            // Arrange
            float targetWeight = 65;
            int activityLevel = 2;
            int difficultyLevel = 1;
            float dailyWater = 3;

            // Act
            var result = await _controller.PutAppUserGoalPage(targetWeight, activityLevel, difficultyLevel, dailyWater);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
            _mockUserManager.Verify(um => um.UpdateAsync(It.Is<AppUser>(u => u.TargetWeight == targetWeight && u.activityLevel == activityLevel && u.difficultyLevel == difficultyLevel && u.DailyWater == dailyWater)), Times.Once);
        }

        [Test]
        public async Task UpdateInfo_UpdatesUserInfo()
        {
            // Arrange
            string gender = "Female";
            float currentWeight = 60;
            int age = 30;
            float height = 165;

            // Act
            var result = await _controller.UpdateInfo(gender, currentWeight, age, height);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
            _mockUserManager.Verify(um => um.UpdateAsync(It.Is<AppUser>(u => u.Gender == gender && u.CurrentWeight == currentWeight && u.Age == age && u.Height == height)), Times.Once);
        }


        [Test]
        public async Task ResetDailyIntake_ResetsUserDailyIntake()
        {
            // Act
            var result = await _controller.ResetDailyIntake();

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
            _mockUserManager.Verify(um => um.UpdateAsync(It.Is<AppUser>(u => u.CurrentCalories == 0 && u.CurrentProtein == 0 && u.CurrentCarbs == 0 && u.CurrentFat == 0 && u.CurrentWater == 0)), Times.Once);
        }


        [Test]
        public async Task UpdateFirsTimeOrNot_UpdatesUserFirstTimeFlag()
        {
            // Arrange
            int number = 1;

            // Act
            var result = await _controller.UpdateFirsTimeOrNot(number);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
            _mockUserManager.Verify(um => um.UpdateAsync(It.Is<AppUser>(u => u.FirsTimeOrNot == number)), Times.Once);
        }



        [Test]
        public async Task FillOutForm_UpdatesUserFormDetails()
        {
            // Arrange
            string gender = "Female";
            double height = 165;
            float targetWeight = 60;
            double weight = 65;
            int activityLevel = 2;
            int difficultyLevel = 1;
            float dailyWater = 3;
            int age = 30;

            // Act
            var result = await _controller.FillOutForm(gender, height, targetWeight, weight, activityLevel, difficultyLevel, dailyWater, age);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
            _mockUserManager.Verify(um => um.UpdateAsync(It.Is<AppUser>(u => u.Gender == gender && u.Height == height && u.TargetWeight == targetWeight && u.CurrentWeight == weight && u.activityLevel == activityLevel && u.difficultyLevel == difficultyLevel && u.DailyWater == dailyWater && u.Age == age && u.FirsTimeOrNot == 1)), Times.Once);
        }
        [Test]
        public async Task DeleteAppUser_DeletesUser()
        {
            // Arrange
            var userToDelete = new AppUser { UserName = "deletableuser", Email = "deletableuser@example.com" };
            _context.Users.Add(userToDelete);
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.DeleteAppUser(userToDelete.Id);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
            Assert.IsNull(await _context.Users.FindAsync(userToDelete.Id));
        }
    }
}



