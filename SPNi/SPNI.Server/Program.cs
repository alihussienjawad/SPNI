using SPNI.Server.Data;
using SPNI.Server.Model;
using Microsoft.EntityFrameworkCore;
using SPNI.Server.DTO;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using SPNI.Interfaces;
using SPNI.Server;
using SPNI.Services;
using ArgosTranslate.PyNet.Helpers;
using Python.Runtime;
using SPNI.Server.Services;



var builder = WebApplication.CreateBuilder(args);
builder.Services.Configure<JWT>(builder.Configuration.GetSection("JWT"));

 
builder.Services.AddDbContext<ApplicationDbContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddSingleton<PythonService>();
//builder.Services.AddHostedService<BackgroundPythonService>();

//Runtime.PythonDLL = @"C:\Users\abd\AppData\Local\Programs\Python\Python312\python312.dll";
//PythonEngine.Initialize();
// Retrieve the Python DLL path from the environment variable
string pythonDllPath = Environment.GetEnvironmentVariable("PYTHON_DLL");
if (string.IsNullOrEmpty(pythonDllPath))
{
    // Fallback to a default path or handle the error
    pythonDllPath = @"C:\python312\python312.dll"; // Adjust this to match your Python installation
}

// Set the Python DLL path
Runtime.PythonDLL = pythonDllPath;

builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddSignInManager()
    .AddRoles<ApplicationRole>();


//builder.Services.AddAuthorization(options =>
//{
//    options.AddPolicy("ApiUser", policy => policy.RequireClaim("rol", "api_access"));
//});

 
// JWT 
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
   // options.RequireHttpsMetadata = false;
    
    options.TokenValidationParameters = new()
    {

        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]!)),
        ClockSkew = TimeSpan.Zero,

    };
   
});
// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
//Add authentication to Swagger UI
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});


builder.Services.AddScoped<IUser, UserService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("SPNIPolicy",
 
        x => x.WithOrigins("https://localhost:5555")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
           );
});

builder.Services.AddHttpContextAccessor(); //for get logged user






var app = builder.Build();

// Ensure Python engine is properly shut down on application stopping
app.Lifetime.ApplicationStopping.Register(() =>
{
    var pythonService = app.Services.GetService<PythonService>();
    pythonService?.Dispose(); // Clean up on shutdown
});


app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}
app.UseCors("SPNIPolicy");
app.UseAuthentication();
app.UseAuthorization();
//app.MapIdentityApi<ApplicationUser>();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();


 