using Cinesplain.Server.Models;
using Cinesplain.Server.Services;
using Cinesplain.Server.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using TMDBModels.Models;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace Cinesplain.Server.Controllers;

[ProducesResponseType(StatusCodes.Status401Unauthorized)]
public class UserController(CinesplainUserManager userManager, IConfiguration config, ILogger<UserController> logger)
    : CinesplainController
{
    private readonly CinesplainUserManager _userManager = userManager;
    private readonly IConfiguration _config = config;
    private readonly ILogger<UserController> _logger = logger;

    [HttpPost("signin")]
    public async Task<ActionResult<string>> SigninUser(LoginRequest loginInfo)
    {
        return await ApiUtility.GetToken(loginInfo.Email, loginInfo.Password);
    }

    [HttpPost("register")]
    public async Task<ActionResult<IdentityResult>> RegisterUser(UserRegisterDTO userInfo)
    {
        var result = await _userManager.RegisterUserAsync(userInfo);
        if (result.Succeeded)
        {
            return Ok(result);
        }

        return BadRequest(result.Errors);
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await _userManager.SignOutUserAsync();
        return NoContent();
    }

    [Authorize]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<UserRetrievalDTO>> GetUser()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
            return Unauthorized();

        var userDTO = await _userManager.GetUserWithFavoritesAsync(user);

        return Ok(userDTO);
    }

    [Authorize]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> UpdateUser(UserUpdateDTO user)
    {
        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser == null)
        {
            return BadRequest();
        }

        currentUser.FirstName = user.FirstName ?? currentUser.FirstName;
        currentUser.LastName = user.LastName ?? currentUser.LastName;
        currentUser.Email = user.Email ?? currentUser.Email;

        await _userManager.UpdateAsync(currentUser);
        return NoContent();
    }

    [Authorize]
    [HttpGet("favorites")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<FavoriteRetrievalDTO>>> GetFavorites()
    {
        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser == null)
        {
            return Unauthorized();
        }

        var favorites = await _userManager.GetFavoritesAsync(currentUser);
        return Ok(favorites);
    }

    [Authorize]
    [HttpPost("favorites/add")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> AddFavorite([FromBody] FavoriteInsertDTO insertParams)
    {
        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser == null)
        {
            return Unauthorized();
        }

        var newFavorite = await _userManager.AddFavoriteAsync(currentUser, insertParams.ContentId, insertParams.ContentType);
        if (newFavorite == null)
        {
            return BadRequest();
        }

        return NoContent();
    }

    [Authorize]
    [HttpPost("favorites/remove")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> RemoveFavorite([FromBody] FavoriteRemovalDTO insertParams)
    {
        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser == null)
        {
            return Unauthorized();
        }

        await _userManager.RemoveFavoriteAsync(currentUser, insertParams.ContentId, insertParams.ContentType);

        return NoContent();
    }

    [HttpGet("favorites/movies")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MovieListPage>> GetFavoriteMovies()
    {
        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser == null)
        {
            return Unauthorized();
        }
        return await _userManager.GetFavoriteMoviesAsync(currentUser);
    }
}
