using Cinesplain.Data.Entities;

namespace Cinesplain.Server.Models;

public partial class UserRegisterDTO
{
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Password { get; set; }
    public string ConfirmPassword { get; set; }
}
