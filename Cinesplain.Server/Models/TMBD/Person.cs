using System.ComponentModel.DataAnnotations;

namespace Cinesplain.API.Models.TMBD;

public class Person
{
    public bool Adult { get; set; }
    [Required] public int Id { get; set; }
    public double Popularity { get; set; }
    public string? ProfilePath { get; set; }

}