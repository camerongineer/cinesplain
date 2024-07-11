namespace Cinesplain.Server.Models;

public class FavoriteRetrievalDTO(long id, string contentId)
{
    public long FavoriteId { get; set; } = id;
    public string ContentId { get; set; } = contentId;  
}