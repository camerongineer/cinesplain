using Cinesplain.API.Models.OMDB;
using Cinesplain.API.Models.TMBD;
using Cinesplain.API.Utilities;
using Cinesplain.Server.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

namespace Cinesplain.API.Controllers;

public class MoviesController(IConfiguration config, ILogger<MoviesController> logger) : CinesplainController
{
    private readonly IConfiguration _config = config;
    private readonly ILogger _logger = logger;

    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [OutputCache(Duration = 86400)]
    public async Task<ActionResult<FullDisplayMovie>> GetMovie(int id)
    {
        try
        {
            var queryParams = new Dictionary<string, string> { { "append_to_response", "images,videos" }, };

            var movie = await ApiUtility.GetTMDBResponseAsync<FullDisplayMovie>(_config, $"movie/{id}", queryParams);

            if (movie?.Videos?.Results != null)
            {
                var trailers = movie
                    .Videos.Results.Where(video => video.Type == "Trailer" || video.Type == "Teaser")
                    .ToList();

                trailers.Sort(
                    (a, b) =>
                    {
                        var aIsOfficial =
                            a.Official && a.Name.Contains("trailer", StringComparison.CurrentCultureIgnoreCase);

                        var bIsOfficial =
                            b.Official && b.Name.Contains("trailer", StringComparison.CurrentCultureIgnoreCase);

                        if (a.Type == "Teaser" && b.Type != "Teaser")
                        {
                            return 1;
                        }
                        else if (b.Type == "Teaser" && a.Type != "Teaser")
                        {
                            return -1;
                        }
                        else
                        {
                            return (aIsOfficial == bIsOfficial) ? 0 : (aIsOfficial ? -1 : 1);
                        }
                    }
                );

                movie.Trailer = trailers.FirstOrDefault();
            }

            return Ok(movie);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting movie details");
        }

        return NotFound();
    }

    [HttpGet("{id:int}/Credits")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [OutputCache(Duration = 10800)]
    public async Task<ActionResult<MovieCreditCategory>> GetMovieCredits(int id)
    {
        try
        {
            var credits = await ApiUtility.GetTMDBResponseAsync<MovieCreditCategory>(_config, $"movie/{id}/credits");
            if (credits != null)
            {
                var crewCredits = ApiUtility.CombineCrewCredits(credits.Crew);
                credits.Crew = crewCredits.ToList();
                return Ok(credits);
            }
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting movie credits");
        }

        return NotFound();
    }

    [HttpGet("{id:int}/Similar")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [OutputCache(Duration = 86400)]
    public async Task<ActionResult<MovieListPage>> GetSimilarMovies(int id)
    {
        try
        {
            var similarMovies = await ApiUtility.GetTMDBResponseAsync<MovieListPage>(_config, $"movie/{id}/similar");
            return Ok(similarMovies);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting similar movies");
        }

        return NotFound();
    }

    [HttpGet("{id:int}/Recommended")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [OutputCache(Duration = 86400)]
    public async Task<ActionResult<MovieListPage>> GetRecommendedMovies(int id)
    {
        try
        {
            var recommendedMovies = await ApiUtility.GetTMDBResponseAsync<MovieListPage>(
                _config,
                $"movie/{id}/recommendations"
            );
            return Ok(recommendedMovies);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting recommended movies");
        }

        return NotFound();
    }

    [HttpGet("Search")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MovieListPage>> SearchMovies([FromQuery] string query, [FromQuery] int page = 1)
    {
        try
        {
            var queryParams = new Dictionary<string, string> { { "query", query }, { "page", $"{page}" } };

            var movieList = await ApiUtility.GetTMDBResponseAsync<MovieListPage>(_config, $"search/movie", queryParams);
            return Ok(movieList);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error searching movies");
        }

        return NotFound();
    }

    [HttpGet("NowPlaying")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [OutputCache(Duration = 21600)]
    public async Task<ActionResult<MovieListPage>> GetNowPlayingMovies()
    {
        try
        {
            var movieList = await ApiUtility.GetTMDBResponseAsync<MovieListPage>(_config, $"movie/now_playing");
            return Ok(movieList);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting now playing movies");
        }

        return NotFound();
    }

    [HttpGet("Discover")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [OutputCache(Duration = 21600)]
    public async Task<ActionResult<MovieListPage>> GetDiscoverMovies()
    {
        try
        {
            var movieList = await ApiUtility.GetTMDBResponseAsync<MovieListPage>(_config, $"discover/movie");
            return Ok(movieList);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting discover movies");
        }

        return NotFound();
    }

    [HttpGet("Upcoming")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [OutputCache(Duration = 21600)]
    public async Task<ActionResult<MovieListPage>> GetUpcomingMovies()
    {
        try
        {
            var queryParams = new Dictionary<string, string>
            {
                { "primary_release_date.gte", ApiUtility.GetFormattedDate(DateTime.Now) },
                { "primary_release_date.lte", ApiUtility.GetFormattedDate(DateTime.Now + TimeSpan.FromHours(2190)) },
                { "sort_by", "popularity.desc" },
                { "with_original_language", "en" }
            };

            var movieList = await ApiUtility.GetTMDBResponseAsync<MovieListPage>(
                _config,
                $"discover/movie",
                queryParams
            );
            var movieListSubset = movieList.Results?.Take(10);
            movieList.Results = movieListSubset;
            return Ok(movieList);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting upcoming movies");
        }

        return NotFound();
    }

    [HttpGet("Classics")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [OutputCache(Duration = 21600)]
    public async Task<ActionResult<MovieListPage>> GetClassicMovies()
    {
        try
        {
            var queryParams = new Dictionary<string, string>
            {
                { "sort_by", "vote_average.desc" },
                { "vote_count.gte", "1000" },
                { "without_genres", "99,10755" },
                { "with_original_language", "en" }
            };

            var movieList = await ApiUtility.GetTMDBResponseAsync<MovieListPage>(
                _config,
                $"discover/movie",
                queryParams
            );
            var movieListSubset = movieList.Results?.Take(12);
            movieList.Results = movieListSubset;
            return Ok(movieList);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting classic movies");
        }

        return NotFound();
    }

    [HttpGet("MostLoved")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [OutputCache(Duration = 21600)]
    public async Task<ActionResult<MovieListPage>> GetMostLovedMovies()
    {
        try
        {
            var queryParams = new Dictionary<string, string>
            {
                { "primary_release_date.gte", ApiUtility.GetFormattedDate(DateTime.Now - TimeSpan.FromHours(2190)) },
                { "sort_by", "vote_average.desc" },
                { "vote_count.gte", "15" },
                { "without_genres", "99,10755" },
                { "with_original_language", "en" }
            };

            var movieList = await ApiUtility.GetTMDBResponseAsync<MovieListPage>(
                _config,
                $"discover/movie",
                queryParams
            );
            var movieListSubset = movieList.Results?.Where(movie => movie.Popularity > 25).Take(8);
            movieList.Results = movieListSubset;
            return Ok(movieList);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting most loved movies");
        }

        return NotFound();
    }

    [HttpGet("MostHated")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [OutputCache(Duration = 21600)]
    public async Task<ActionResult<MovieListPage>> GetMostHatedMovies()
    {
        try
        {
            var queryParams = new Dictionary<string, string>
            {
                { "primary_release_date.gte", ApiUtility.GetFormattedDate(DateTime.Now - TimeSpan.FromHours(2190)) },
                { "sort_by", "vote_average.asc" },
                { "vote_count.gte", "15" },
                { "without_genres", "99,10755" },
                { "with_original_language", "en" }
            };

            var movieList = await ApiUtility.GetTMDBResponseAsync<MovieListPage>(
                _config,
                $"discover/movie",
                queryParams
            );
            var movieListSubset = movieList.Results?.Where(movie => movie.Popularity > 25).Take(8);
            movieList.Results = movieListSubset;
            return Ok(movieList);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting most hated movies");
        }

        return NotFound();
    }

    [HttpGet("OMDB{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [OutputCache(Duration = 604800)]
    public async Task<ActionResult<OmdbMovieDetails>> GetOmdbMovieDetails(string id)
    {
        try
        {
            var omdbMovieDetails = await ApiUtility.GetOMDBResponseAsync<OmdbMovieDetails>(_config, id);
            var ratingDetails = new OmdbMovieRatingDetails
            {
                ImdbRating = double.TryParse(omdbMovieDetails.imdbRating, out var iResult) ? iResult : (double?)null,

                Metascore = int.TryParse(omdbMovieDetails.Metascore, out var mResult) ? mResult : (int?)null
            };

            var rottenTomatoesScore = omdbMovieDetails
                .Ratings.FirstOrDefault(rating => rating.Source == "Rotten Tomatoes")
                ?.Value;

            ratingDetails.RottenTomatoesScore = int.TryParse(rottenTomatoesScore?.Trim('%'), out var rResult)
                ? rResult
                : (int?)null;

            omdbMovieDetails.RatingDetails = ratingDetails;

            return Ok(omdbMovieDetails);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting OMDB movie details");
        }

        return NotFound();
    }
}
