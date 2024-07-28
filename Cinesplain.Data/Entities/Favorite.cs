using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cinesplain.Data.Entities;

public class Favorite(string userId, string contentId, string contentType)
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long FavoriteId { get; set; }

    [Required]
    public string UserId { get; set; } = userId;

    public CinesplainUser? User { get; set; }

    [Required]
    [MaxLength(36)]
    public string ContentId { get; set; } = contentId;

    [Required]
    [MaxLength(10)]
    public string ContentType { get; set; } = contentType;
}