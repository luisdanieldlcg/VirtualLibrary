using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BooksController
    {
        private readonly ILogger<AuthController> _logger;
        private readonly DbInstance _db;

        public BooksController(ILogger<AuthController> logger, DbInstance db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllBooks()
        {
            _logger.LogInformation("Attempting to get all books");
            var books = await _db.Books.ToListAsync();
            _logger.LogInformation("There are {count} books.", books.Count);
            return JSend.Success(books);
        }
    }
}