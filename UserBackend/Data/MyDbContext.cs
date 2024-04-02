using Microsoft.EntityFrameworkCore;
using UserBackend.Data.Models;

public class MyDbContext : DbContext
{
	private const string DbName = "UserDatabase";
    private const string ConnectionString = $"Data Source=localhost;Initial Catalog={DbName};User ID=SA;Password=!.;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False";
 
    public DbSet<User> Users { get; set; }
    

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlServer(ConnectionString);
		//recheck connectionString if issue connecting to db
  		//can reuse connection string from week 3 using your new database
}