using Cinesplain.Server.Utilities;
using Microsoft.AspNetCore.Mvc;
using TMDBModels.Models;

namespace Cinesplain.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PeopleController(IConfiguration config) : ControllerBase
{
    private readonly IConfiguration _config = config;

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<FullDisplayPerson> GetPerson(string id)
    {
        try
        {
            var queryParams = new Dictionary<string, string> {
                { "append_to_response", "images,movie_credits" },
            };

            var person = ApiUtility.GetTMDBResponse<FullDisplayPerson>(_config, $"person/{id}", queryParams);
            var movieCrewCredits = ApiUtility.CombineCrewCredits(person.MovieCredits.Crew);
            person.MovieCredits.Crew = (List<ListDisplayMovieCrewCredit>)movieCrewCredits;
            return Ok(person);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }

        return NotFound();
    }
}