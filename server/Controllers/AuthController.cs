using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Dtos;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly ILogger<AuthController> _logger;
        private readonly DbInstance _db;
        private readonly IConfiguration _config;

        public AuthController(ILogger<AuthController> logger, DbInstance db, IConfiguration config)
        {
            _logger = logger;
            _db = db;
            _config = config;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDTO dto)
        {
            _logger.LogInformation("Attempting to login");

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.EmailOrUsername || u.UserName == dto.EmailOrUsername);
            if (user == null) return JSend.Error("El usuario no existe o la contraseña es incorrecta");
            var validPassword = BCrypt.Net.BCrypt.EnhancedVerify(dto.Password, user.Password, BCrypt.Net.HashType.SHA512);
            if (!validPassword) return JSend.Error("El usuario no existe o la contraseña es incorrecta");

            _logger.LogInformation("User with id {id} has logged in", user.IdUser);

            return JSend.Success(user);
        }

        [HttpPost("signup")]
        public async Task<ActionResult> Signup([FromForm] SignUpDTO dto)
        {
            _logger.LogInformation("Attempting to register a new user");
            var existingUser = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email || u.UserName == dto.Username);
            if (existingUser != null) return JSend.Error("El correo electrónico o nombre de usuario ya está en uso");

            var hash = BCrypt.Net.BCrypt.EnhancedHashPassword(dto.Password, BCrypt.Net.HashType.SHA512, 12);

            var avatarUrl = Constants.DefaultAvatarPath;

            if (dto.AvatarImage != null)
            {
                _logger.LogInformation("Uploading avatar image");
                avatarUrl = await ImageUpload.UploadAvatar(dto.Username, dto.AvatarImage);
                if (avatarUrl == null) return JSend.Error("No se pudo subir la imagen. Inténtalo de nuevo.");
            }
            var result = _db.Users.Add(new UserModel
            {
                FullName = dto.FullName,
                UserName = dto.Username,
                Email = dto.Email,
                Password = hash,
                AvatarImageUrl = avatarUrl,
                SignupDate = DateTime.Now,
            });

            var saved = await _db.SaveChangesAsync() > 0;
            if (!saved) return JSend.Error("No se pudo completar el registro. Inténtalo de nuevo.");
            result.Entity.AvatarImageUrl = Constants.GetServerUrl(HttpContext, result.Entity.AvatarImageUrl);
            _logger.LogInformation("User registered successfully");
            return JSend.Success(result.Entity);
        }
    }
}
