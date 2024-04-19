using BarcodeAPI.Data.Models;
using Microsoft.EntityFrameworkCore;


namespace BarcodeAPI.Data
{
    public class BarcodeAPIDbContext : DbContext
    {

        public DbSet<Barcode> Barcode { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=127.0.0.1,1433;Database=Barcode_API;User Id=sa;Password=Amran1a1;TrustServerCertificate=True");
        }

        public BarcodeAPIDbContext(DbContextOptions<BarcodeAPIDbContext> options) : base(options) { }

    }
}
