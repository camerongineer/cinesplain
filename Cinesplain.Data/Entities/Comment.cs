using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Cinesplain.Data.Entities;
public class Comment(string contentId, string contentType)
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long CommentId { get; set; }

    [Required]
    [MaxLength(500)]
    public string Value { get; set; } = string.Empty;

    [Required]
    public CinesplainUser User { get; set; } = null!;

    [Required]
    [MaxLength(36)]
    public string ContentId { get; set; } = contentId;

    [Required]
    [MaxLength(10)]
    public string ContentType { get; set; } = contentType;

    [Required, DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime CreatedUtc { get; set; }
}
