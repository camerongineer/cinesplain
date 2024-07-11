using Cinesplain.Data.Contexts;
using Cinesplain.Data.Entities;
using Cinesplain.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Cinesplain.Server.Services;

public class CinesplainUserManager(
    IUserStore<CinesplainUser> store,
    IOptions<IdentityOptions> optionsAccessor,
    IPasswordHasher<CinesplainUser> passwordHasher,
    IEnumerable<IUserValidator<CinesplainUser>> userValidators,
    IEnumerable<IPasswordValidator<CinesplainUser>> passwordValidators,
    ILookupNormalizer keyNormalizer,
    IdentityErrorDescriber errors,
    IServiceProvider services,
    ILogger<UserManager<CinesplainUser>> logger,
    CinesplainDbContext context
)
    : UserManager<CinesplainUser>(
        store,
        optionsAccessor,
        passwordHasher,
        userValidators,
        passwordValidators,
        keyNormalizer,
        errors,
        services,
        logger
    )
{
    private readonly CinesplainDbContext _context = context;

    public async Task<UserRetrievalDTO> GetUserWithFavoritesAsync(CinesplainUser user)
    {
        var currentUser =
            await _context
                .Users.AsNoTracking()
                .Where(u => u.Id == user.Id)
                .Include(u => u.Favorites)
                .FirstOrDefaultAsync() ?? throw new InvalidOperationException("User not found");
        return new UserRetrievalDTO
        {
            FirstName = currentUser.FirstName,
            LastName = currentUser.LastName,
            Email = currentUser.Email,
            Favorites = currentUser.Favorites.Select(f => new FavoriteRetrievalDTO(f.FavoriteId, f.ContentId)).ToList()
        };
    }

    public async Task<IEnumerable<FavoriteRetrievalDTO>> GetFavoritesAsync(CinesplainUser user)
    {
        return await _context
            .Favorites.AsNoTracking()
            .Where(f => f.UserId == user.Id)
            .Select(f => new FavoriteRetrievalDTO(f.FavoriteId, f.ContentId))
            .ToListAsync();
    }

    public async Task<Favorite?> AddFavoriteAsync(CinesplainUser user, string contentId)
    {
        var favorite = new Favorite(user.Id, contentId);
        await _context.Favorites.AddAsync(favorite);
        await _context.SaveChangesAsync();
        return favorite;
    }

    public async Task RemoveFavoriteAsync(CinesplainUser user, string contentId)
    {
        var favorite =
            await _context.Favorites.Where(f => f.UserId == user.Id && f.ContentId == contentId).FirstOrDefaultAsync()
            ?? throw new InvalidOperationException("Favorite not found");

        _context.Favorites.Remove(favorite);
        await _context.SaveChangesAsync();
    }
}
