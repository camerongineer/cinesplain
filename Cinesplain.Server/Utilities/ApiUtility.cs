using Cinesplain.API.Models.TMBD;
using System.Text.Json;

namespace Cinesplain.API.Utilities;

public static class ApiUtility
{
    private static readonly JsonSerializerOptions _jsonSerializerOptions =
        new() { PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower, };

    private static async Task<HttpResponseMessage> GetAPIResponseAsync(string baseUrl, string apiKey, string endpoint)
    {
        using var client = new HttpClient();
        client.BaseAddress = new Uri(baseUrl);
        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
        return await client.GetAsync(endpoint);
    }

    public static async Task<T> GetTMDBResponseAsync<T>(
        IConfiguration config,
        string endpoint,
        Dictionary<string, string>? queryParams = null
    )
    {
        var defaultQueryParams = new Dictionary<string, string> { { "include_adult", "false" }, { "language", "en" }, };

        var defaultQueryString = BuildQueryString(defaultQueryParams);
        var queryString = BuildQueryString(queryParams);
        var fullEndpoint = $"{endpoint}?{defaultQueryString}" + (queryString != null ? $"&{queryString}" : "");
        var tmdbBaseUrl = config["TMDB_API_URL"] ?? "";
        var tmdbApiKey = config["TMDB_API_KEY"] ?? "";
        var response = await GetAPIResponseAsync(tmdbBaseUrl, tmdbApiKey, fullEndpoint);

        if (response.IsSuccessStatusCode)
        {
            var responseContent = response.Content.ReadAsStringAsync().Result;
            var deserializedContent = JsonSerializer.Deserialize<T>(responseContent, _jsonSerializerOptions);

            if (deserializedContent != null)
            {
                return deserializedContent;
            }
        }

        throw new Exception($"Error: {response.StatusCode}");
    }

    public static async Task<T> GetOMDBResponseAsync<T>(IConfiguration config, string imdbId)
    {
        var omdbBaseUrl = config["OMDB_API_URL"] ?? "";
        var omdbApiKey = config["OMDB_API_KEY"] ?? "";
        var response = await GetAPIResponseAsync(omdbBaseUrl, omdbBaseUrl, $"?apikey={omdbApiKey}&i={imdbId}");

        if (response.IsSuccessStatusCode)
        {
            var responseContent = response.Content.ReadAsStringAsync().Result;
            var deserializedContent = JsonSerializer.Deserialize<T>(responseContent);

            if (deserializedContent != null)
            {
                return deserializedContent;
            }
        }

        throw new Exception($"Error: {response.StatusCode}");
    }

    private static string? BuildQueryString(Dictionary<string, string>? queryParams)
    {
        if (queryParams == null || queryParams.Count == 0)
        {
            return null;
        }

        var keyValuePairs = queryParams
            .Where(kv => !string.IsNullOrEmpty(kv.Value))
            .Select(kv => $"{kv.Key}={Uri.EscapeDataString(kv.Value ?? string.Empty)}");

        return string.Join("&", keyValuePairs);
    }

    public static string GetFormattedDate(DateTime date, string format = "yyyy-MM-dd")
    {
        string year = date.Year.ToString();
        string month = date.Month.ToString().PadLeft(2, '0');
        string day = date.Day.ToString().PadLeft(2, '0');

        return format.Replace("yyyy", year).Replace("MM", month).Replace("dd", day);
    }

    public static IEnumerable<T> CombineCrewCredits<T>(IEnumerable<T> crewCredits)
        where T : ICrewCredit
    {
        Dictionary<int, T> uniqueMovies = [];

        foreach (var credit in crewCredits.Where(credit => !uniqueMovies.TryAdd(credit.Id, credit)))
        {
            if (!uniqueMovies[credit.Id].Job.Split(", ").Contains(credit.Job))
            {
                uniqueMovies[credit.Id].Job = $"{uniqueMovies[credit.Id].Job}, {credit.Job}";
            }
            if (!uniqueMovies[credit.Id].Department.Split(", ").Contains(credit.Department))
            {
                uniqueMovies[credit.Id].Department = $"{uniqueMovies[credit.Id].Department}, {credit.Department}";
            }
        }

        return uniqueMovies.Values;
    }
}
