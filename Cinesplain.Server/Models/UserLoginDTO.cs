﻿namespace Cinesplain.Server.Models;

public class UserLoginDTO
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}