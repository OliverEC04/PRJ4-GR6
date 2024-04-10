using Microsoft.EntityFrameworkCore;
using UserBackend.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace UserBackend.Data
{
    public class MyDbContext : IdentityDbContext<AppUser>
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("secret.json")
                .Build();
        
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("MyDatabase"));
        }

        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }



        /*protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppUser>().HasData(
                new AppUser
                {
                    AppUserId = 1,
                    FullName = "John Doe",
                    Email = "sad@gmail.com",
                    DateOfBirth = new DateOnly(1999, 12, 12),
                    Password = "1234"
                }
            );

        }*/
    }
}