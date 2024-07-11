using Cinesplain.Data.Contexts;
using Cinesplain.Data.Entities;
using Cinesplain.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

ConfigureServices(builder.Services, builder.Configuration);

var app = builder.Build();

app.MapIdentityApi<CinesplainUser>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseFileServer();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.UseOutputCache();

app.Run();


static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
{
    var connection = configuration.GetConnectionString("DefaultConnection");

    services.AddLogging(config =>
    {
        config.AddConsole();
        config.AddDebug();
    });

    services.AddDbContext<CinesplainDbContext>(options => {
        options.UseSqlServer(connection, b => b.MigrationsAssembly("Cinesplain.Server"));
    });

    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(configuration);

    services.AddIdentityApiEndpoints<CinesplainUser>()
        .AddEntityFrameworkStores<CinesplainDbContext>();

    services.AddScoped<CinesplainUserManager>();

    services.AddAuthorization();

    services.AddControllers();
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen(options =>
    {
        options.SwaggerDoc("v1", new()
        {
            Title = "Cinesplain API",
            Version = "v1"
        });
        options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "Please enter the API token",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT"
        });

        options.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            []
        }
    });
    });
    services.AddOutputCache();
}