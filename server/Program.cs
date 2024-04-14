using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using server;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var databaseSettings = builder.Configuration.GetConnectionString("Dev")
?? throw new Exception("Database connection string not found");

builder.Services.AddDbContext<DbInstance>(options => options.UseMySQL(databaseSettings));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddCookie(cookieOpts => cookieOpts.Cookie.Name = "authToken")
.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
{
    options.TokenValidationParameters = JwtHelper.GetValidationParameters(builder.Configuration["Jwt:Secret"]!);
    options.SaveToken = true;
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            context.Token = context.Request.Cookies["authToken"];
            return Task.CompletedTask;
        }
    };
});

builder.Services
.AddCors((options) =>
{
    options.AddPolicy("cors", corsbuilder =>
    {
        corsbuilder
        .SetIsOriginAllowed((host) => true)
        .AllowAnyHeader()
        .AllowCredentials()
        .AllowAnyMethod();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthorization();
app.UseStaticFiles();
app.MapControllers();
app.UseCors("cors");
app.Run();
