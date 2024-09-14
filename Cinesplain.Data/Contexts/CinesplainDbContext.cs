using Cinesplain.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Cinesplain.Data.Contexts;

public class CinesplainDbContext(DbContextOptions<CinesplainDbContext> options) : IdentityDbContext<CinesplainUser>(options)
{
    public DbSet<Favorite> Favorites { get; set; }
    public DbSet<Comment> Comments { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<CinesplainUser>().ToTable("Users");
    }
}
