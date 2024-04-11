using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Dtos;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly ILogger<AuthController> _logger;
        private readonly DbInstance _db;

        public AuthController(ILogger<AuthController> logger, DbInstance db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpPost("login")]
        public ActionResult Login(LoginDTO dto)
        {
            _logger.LogInformation("Attempting to login");
            return JSend.Success("Login successful");
        }

        [HttpPost("signup")]
        public async Task<ActionResult> Signup(SignUpDTO dto)
        {
            _logger.LogInformation("Attempting to signup");
            // test connection
            var users = await _db.Users.ToListAsync();
            return JSend.Success(users);
        }
    }
}
