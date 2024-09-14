using Cinesplain.Data.Contexts;
using Cinesplain.Data.Entities;
using Cinesplain.Server.Models;
using Cinesplain.Server.Utilities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TMDBModels.Models;

namespace Cinesplain.Server.Services;

public class CinesplainUserManager(
    IConfiguration config,
    IUserStore<CinesplainUser> store,
    IOptions<IdentityOptions> optionsAccessor,
    IPasswordHasher<CinesplainUser> passwordHasher,
    IEnumerable<IUserValidator<CinesplainUser>> userValidators,
    IEnumerable<IPasswordValidator<CinesplainUser>> passwordValidators,
    ILookupNormalizer keyNormalizer,
    IdentityErrorDescriber errors,
    IServiceProvider services,
    ILogger<UserManager<CinesplainUser>> logger,
    CinesplainDbContext context,
    SignInManager<CinesplainUser> signInManager
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
    private readonly SignInManager<CinesplainUser> _signInManager = signInManager;

    public async Task<IdentityResult> RegisterUserAsync(UserRegisterDTO userInfo)
    {
        if (userInfo.Password != userInfo.ConfirmPassword)
        {
            throw new InvalidOperationException("Passwords do not match");
        }

        var user = new CinesplainUser
        {
            UserName = userInfo.Email,
            Email = userInfo.Email,
            FirstName = userInfo.FirstName,
            LastName = userInfo.LastName,
        };
        return await CreateAsync(user, userInfo.Password);
    }

    public async Task SignOutUserAsync()
    {
        await _signInManager.SignOutAsync();
    }

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
            Favorites = currentUser
                .Favorites.Select(f => new FavoriteRetrievalDTO(f.FavoriteId, f.ContentId, f.ContentType))
                .ToList()
        };
    }

    public async Task<IEnumerable<FavoriteRetrievalDTO>> GetFavoritesAsync(CinesplainUser user)
    {
        return await _context
            .Favorites.AsNoTracking()
            .Where(f => f.UserId == user.Id)
            .Select(f => new FavoriteRetrievalDTO(f.FavoriteId, f.ContentId, f.ContentType))
            .ToListAsync();
    }

    public async Task<Favorite?> AddFavoriteAsync(CinesplainUser user, string contentId, string contentType)
    {
        var allowedTypes = new List<string> { "movies", "people", "tv" };

        if (!allowedTypes.Contains(contentType))
        {
            throw new ArgumentException("Invalid contentType. Allowed values are 'movies', 'people', or 'tv'.");
        }

        var favorite = new Favorite(user.Id, contentId, contentType);
        await _context.Favorites.AddAsync(favorite);
        await _context.SaveChangesAsync();
        return favorite;
    }

    public async Task RemoveFavoriteAsync(CinesplainUser user, string contentId, string contentType)
    {
        var allowedTypes = new List<string> { "movies", "people", "tv" };

        if (!allowedTypes.Contains(contentType))
        {
            throw new ArgumentException("Invalid contentType. Allowed values are 'movies', 'people', or 'tv'.");
        }

        var favorite =
            await _context
                .Favorites.Where(f => f.UserId == user.Id && f.ContentId == contentId && f.ContentType == contentType)
                .FirstOrDefaultAsync() ?? throw new InvalidOperationException("Favorite not found");

        _context.Favorites.Remove(favorite);
        await _context.SaveChangesAsync();
    }

    public async Task<MovieListPage> GetFavoriteMoviesAsync(CinesplainUser currentUser)
    {
        var queryParams = new Dictionary<string, string>
        {
            { "primary_release_date.gte", ApiUtility.GetFormattedDate(DateTime.Now - TimeSpan.FromHours(2190)) },
            { "sort_by", "vote_average.asc" },
            { "vote_count.gte", "15" },
            { "without_genres", "99,10755" },
            { "with_original_language", "en" }
        };

        var movieList = await ApiUtility.GetTMDBResponseAsync<MovieListPage>(config, $"discover/movie", queryParams);
        var movieListSubset = movieList.Results?.Where(movie => movie.Popularity > 25).Take(8);
        movieList.Results = movieListSubset;
        return movieList;
    }
}
