using System.ComponentModel.DataAnnotations;

namespace Cinesplain.API.Models.TMBD;

public class Collection
{
    [Required] public int Id { get; set; }
    [Required] public string Name { get; set; }
    public string? PosterPath { get; set; }
    public string? BackdropPath { get; set; }
}