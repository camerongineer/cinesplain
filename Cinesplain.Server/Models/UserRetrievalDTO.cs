namespace Cinesplain.Server.Models;

public class UserRetrievalDTO
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string? Email { get; set; }
    public List<FavoriteRetrievalDTO> Favorites { get; set; } = [];
}