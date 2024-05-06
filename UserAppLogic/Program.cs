using UserBackend.Data;
using UserAppLogic.Data;
using UserBackend.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Data.SqlClient;
using Microsoft.OpenApi.Models;
using AppUserBackend.Controllers;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddCors();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => 
{
    //options.ParameterFilter<SortColumnFilter>();
    //options.ParameterFilter<SortOrderFilter>();
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "UserAPI",
        Version = "v1",
        Description = "API to mange Users"
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});


builder.Configuration.AddJsonFile("secret.json");

builder.Services.AddDbContext<MyDbContext>(options => 
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("MyDatabase"))
    );

builder.Services.AddIdentity<AppUser, IdentityRole>(options => {
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 8;
})
.AddEntityFrameworkStores<MyDbContext>();

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme =
    options.DefaultChallengeScheme =
    options.DefaultForbidScheme =
    options.DefaultScheme = 
    options.DefaultSignInScheme =
    options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuer = true,
    ValidIssuer = builder.Configuration["JWT:Issuer"],
    ValidateAudience = true,
    ValidAudience = builder.Configuration["JWT:Audience"],
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(
        System.Text.Encoding.UTF8.GetBytes(builder.Configuration["SigningKeys:Default"]))
};
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireClaim("isAdmin", "true"));
    options.AddPolicy("User", policy => policy.RequireClaim("isUser", "true"));
});

builder.Services.AddRazorPages();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



builder.Services.AddEndpointsApiExplorer();



//app.UseHttpsRedirection();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    string swaggerJsonBasePath = string.IsNullOrWhiteSpace(c.RoutePrefix) ? "." : "..";
    c.SwaggerEndpoint($"{swaggerJsonBasePath}/swagger/v1/swagger.json", "Barcode API");
});

app.UseCors(x => x
    .AllowAnyOrigin() // Not allowed together with AllowCredential
    .WithOrigins("http://localhost:3000", "http://localhost:8080", "http://localhost:5000")
    .SetIsOriginAllowed(x => _ = true)
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
);



app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();
using (var scope = app.Services.CreateScope())
{
    var serviceProvider = scope.ServiceProvider;
    var userManager = serviceProvider.GetService<UserManager<AppUser>>();
    var configuration = serviceProvider.GetService<IConfiguration>(); 
    if(userManager != null && configuration != null)
        DbInitializer.SeedUsers(userManager, configuration); 
    else throw new Exception("UserManager or IConfiguration is null");
}





app.MapControllers();

app.Run();
