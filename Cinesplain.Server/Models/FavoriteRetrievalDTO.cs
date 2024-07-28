namespace Cinesplain.Server.Models;

public class FavoriteRetrievalDTO(long id, string contentId, string contentType)
{
    public long FavoriteId { get; set; } = id;
    public string ContentId { get; set; } = contentId;
    public string ContentType { get; set; } = contentType;
}