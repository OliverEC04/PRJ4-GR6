using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using UserBackend.Data;
using UserBackend.Data.Models;
using AppUserBackend.Controllers;
using BarcodeAPI.Data.Models;

namespace UnitTestingWebApi
{
    public class ImageControllerTests
    {
        private MyDbContext _context;
        private Mock<UserManager<AppUser>> _mockUserManager;
        private ImageController _controller;
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
            _mockUserManager = new Mock<UserManager<AppUser>>(store.Object, null, null, null, null, null, null, null, null);

            _appUser = new AppUser
            {
                UserName = "testuser",
                Email = "testuser@example.com",
                Image = new ImageEntity()
            };

            _mockUserManager.Setup(um => um.FindByNameAsync(It.IsAny<string>())).ReturnsAsync(_appUser);
            _mockUserManager.Setup(um => um.Users).Returns(GetQueryableMockDbSet(new[] { _appUser }));

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, "testuser")
            }));

            var context = new DefaultHttpContext { User = user };

            _controller = new ImageController(_context, _mockUserManager.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = context
                }
            };
        }

        private static DbSet<T> GetQueryableMockDbSet<T>(IEnumerable<T> sourceList) where T : class
        {
            var queryable = sourceList.AsQueryable();
            var dbSet = new Mock<DbSet<T>>();
            dbSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryable.Provider);
            dbSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryable.Expression);
            dbSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
            dbSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(queryable.GetEnumerator());
            return dbSet.Object;
        }

        [Test]
        public async Task SaveImage_SavesImageData()
        {
            // Arrange
            var imageMock = new Mock<IFormFile>();
            var content = "Fake image content";
            var fileName = "test.png";
            var ms = new MemoryStream();
            var writer = new StreamWriter(ms);
            writer.Write(content);
            writer.Flush();
            ms.Position = 0;
            imageMock.Setup(f => f.OpenReadStream()).Returns(ms);
            imageMock.Setup(f => f.FileName).Returns(fileName);
            imageMock.Setup(f => f.Length).Returns(ms.Length);
            imageMock.Setup(f => f.ContentType).Returns("image/png");

            // Act
            IActionResult result = null;
            try
            {
                result = await _controller.SaveImage(imageMock.Object);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
        }



        [Test]
        public async Task DeleteImage_DeletesImage()
        {
            // Arrange
            var imageEntity = new ImageEntity
            {
                Data = new byte[] { 1, 2, 3 },
                ContentType = "image/png",
                Name = "test.png",
                AppUserId = _appUser.Id
            };
            _context.Images.Add(imageEntity);
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.DeleteImage();

            // Assert
            Assert.IsInstanceOf<OkResult>(result);
            Assert.IsNull(await _context.Images.FindAsync(imageEntity.Id));
        }
    }
}

   

