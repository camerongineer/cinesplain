using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Cinesplain.Data.Contexts;

public class AuthDbContext<T>(DbContextOptions<AuthDbContext<T>> options) : IdentityDbContext<T>(options) where T : IdentityUser
{
    override public DbSet<T> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}
