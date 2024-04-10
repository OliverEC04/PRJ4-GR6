using Microsoft.EntityFrameworkCore;
using UserBackend.Data.Models;

namespace UserBackend.Data
{
    public class MyDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=127.0.0.1,1433;Database=BAD_F24;User Id=sa;Password=Sherlock123!.;TrustServerCertificate=True");
        }

        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserId = 1,
                    Name = "John Doe",
                    Email = "sad@gmail.com",
                    DateOfBirth = new DateOnly(1999, 12, 12),
                    Password = "1234"
                }
            );

        }
    }
}