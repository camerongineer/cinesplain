using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cinesplain.Data.Entities
{
    [Table("users")]
    public class CinesplainUser() : IdentityUser
    {
        [Required]
        [MinLength(1)]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(50)]
        public string LastName { get; set; }
        public List<Favorite> Favorites { get; set; } = [];
    }
}
