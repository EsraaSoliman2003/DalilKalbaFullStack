using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CatBlog.Data;
using CatBlog.Models;

namespace CatBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly CatBlogContext _context;

        public NewsController(CatBlogContext context)
        {
            _context = context;
        }

        // ✅ عرض كل الأخبار
        [HttpGet]
        public IActionResult GetAll()
        {
            var news = _context.News
                .OrderByDescending(n => n.CreatedAt)
                .ToList();

            return Ok(news);
        }

        // ✅ إنشاء خبر جديد (يتطلب تسجيل دخول)
        [HttpPost("create")]
        [Authorize]
        public IActionResult Create([FromBody] News news)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            news.CreatedAt = DateTime.Now;
            _context.News.Add(news);
            _context.SaveChanges();

            return Ok(news);
        }

        // ✅ تعديل خبر
        [HttpPut("edit/{id}")]
        [Authorize]
        public IActionResult Edit(int id, [FromBody] News updatedNews)
        {
            var existing = _context.News.FirstOrDefault(n => n.Id == id);
            if (existing == null)
                return NotFound(new { Error = "News item not found" });

            existing.Text = updatedNews.Text;
            _context.SaveChanges();

            return Ok(existing);
        }

        // ✅ حذف خبر
        [HttpDelete("delete/{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            var news = _context.News.FirstOrDefault(n => n.Id == id);
            if (news == null)
                return NotFound();

            _context.News.Remove(news);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
