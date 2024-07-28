namespace Cinesplain.Server.Models;

public class FavoriteInsertDTO(string contentId, string contentType)
{
    public string ContentId { get; set; } = contentId;
    public string ContentType { get; set; } = contentType;
}
