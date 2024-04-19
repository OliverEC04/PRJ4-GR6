using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Reflection;
using BarcodeAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
var dbName = Environment.GetEnvironmentVariable("DB_NAME");
var dbPassword = Environment.GetEnvironmentVariable("DB_SA_PASSWORD");


var connectionString =
    "Data Source=127.0.0.1,1433;Database=Barcode_API;User Id=sa;Password=Amran1a1;TrustServerCertificate=True";
builder.Services.AddDbContext<BarcodeAPIDbContext>(opt => opt.UseSqlServer(connectionString));


builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "BarcodeApi",
        Version = "v1",
        Description = "API to mange Barcode"
    });

});

var app = builder.Build();



app.UseHttpsRedirection();
app.UseSwagger();

app.UseSwaggerUI(c =>
{
    string swaggerJsonBasePath = string.IsNullOrWhiteSpace(c.RoutePrefix) ? "." : "..";
    c.SwaggerEndpoint($"{swaggerJsonBasePath}/swagger/v1/swagger.json", "Barcode API");
});

app.UseCors(x => x
    .AllowAnyOrigin() // Not allowed together with AllowCredential
    .WithOrigins("http://localhost:3000", "http://localhost:8080", "http://localhost:5000" )
    .SetIsOriginAllowed(x => _ = true)
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
);





app.UseAuthentication();


app.UseAuthorization();

app.MapControllers();


app.Run();

