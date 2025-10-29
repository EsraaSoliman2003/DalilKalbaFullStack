using Microsoft.AspNetCore.Mvc;
using CatBlog.Data;

namespace CatBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly CatBlogContext _context;
        public PostsController(CatBlogContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll()
        {
            var posts = _context.Posts
                .OrderByDescending(p => p.CreatedAt)
                .ToList();

            return Ok(posts);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var post = _context.Posts.FirstOrDefault(p => p.Id == id && !p.IsFeatured);
            if (post == null) return NotFound();

            return Ok(post);
        }
    }
}
