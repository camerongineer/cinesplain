using Cinesplain.API.Models.TMBD;
using Cinesplain.API.Utilities;
using Cinesplain.Server.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Cinesplain.API.Controllers;

public class PeopleController(IConfiguration config, ILogger<PeopleController> logger) : CinesplainController
{
    private readonly IConfiguration _config = config;
    private readonly ILogger _logger = logger;

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<FullDisplayPerson>> GetPerson(string id)
    {
        try
        {
            var queryParams = new Dictionary<string, string> { { "append_to_response", "images,movie_credits" }, };
            var person = await ApiUtility.GetTMDBResponseAsync<FullDisplayPerson>(_config, $"person/{id}", queryParams);
            if (person != null)
            {
                var movieCrewCredits = ApiUtility.CombineCrewCredits(person.MovieCredits.Crew);
                person.MovieCredits.Crew = movieCrewCredits.ToList();
                return Ok(person);
            }
        }
        catch (Exception e)
        {
            _logger.LogError(e, $"Error getting person with id {id}");
        }

        return NotFound();
    }
}
