using Cinesplain.Server.Models;
using Cinesplain.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Cinesplain.Server.Controllers;

[Authorize]
[ProducesResponseType(StatusCodes.Status401Unauthorized)]
public class UserController(CinesplainUserManager userManager, IConfiguration config, ILogger<UserController> logger) : CinesplainController
{
    private readonly CinesplainUserManager _userManager = userManager;
    private readonly IConfiguration _config = config;
    private readonly ILogger<UserController> _logger = logger;

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<UserRetrievalDTO>> GetUser()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var userDTO = await _userManager.GetUserWithFavoritesAsync(user);

        return Ok(userDTO);
    }

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

        var newFavorite = await _userManager.AddFavoriteAsync(currentUser, insertParams.ContentId);
        if (newFavorite == null)
        {
            return BadRequest();
        }

        return NoContent();
    }

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

        await _userManager.RemoveFavoriteAsync(currentUser, insertParams.ContentId);

        return NoContent();
    }
}
