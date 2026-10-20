var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddOutputCache();

// In production, ASP.NET serves the API directly and reverse-proxies everything
// else (pages and assets) to the Node SSR server built by TanStack Start
// (.output/server/index.mjs).
builder.Services
    .AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseOutputCache();

app.UseAuthorization();

app.MapControllers();

if (!app.Environment.IsDevelopment()) {
    app.MapReverseProxy();
}

app.Run();
