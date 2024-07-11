using Microsoft.AspNetCore.Mvc;

namespace Cinesplain.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
[ProducesResponseType(StatusCodes.Status500InternalServerError)]
public class CinesplainController : ControllerBase { };