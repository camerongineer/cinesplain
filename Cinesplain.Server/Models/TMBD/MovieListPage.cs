﻿namespace Cinesplain.API.Models.TMBD;

public class MovieListPage
{
    public int Page { get; set; }
    public IEnumerable<ListDisplayMovie>? Results { get; set; }
    public int TotalPages { get; set; }
    public int TotalResults { get; set; }
}