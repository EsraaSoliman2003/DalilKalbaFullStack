using Microsoft.AspNetCore.Mvc;
using DalilKalba.Data;
using DalilKalba.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;   // <-- أضيفي هذا

namespace DalilKalba.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly DalilKalbaContext _context;
        private readonly IConfiguration _config;
        private readonly IWebHostEnvironment _env;   // <-- معلن عنه هنا

        // <-- عدّلي الـ constructor ليستقبل IWebHostEnvironment
        public AdminController(DalilKalbaContext context, IConfiguration config, IWebHostEnvironment env)
        {
            _context = context;
            _config = config;
            _env = env;   // <-- احفظيه هنا
        }

        // === باقي الكود كما هو، بس عدّلي Delete و SaveImageAsync ===

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginViewModel model)
        {
            var admin = _context.Admins.FirstOrDefault(a =>
                a.Username == model.Username && a.Password == model.Password);

            if (admin == null)
                return Unauthorized(new { Error = "Invalid credentials" });

            var token = GenerateJwtToken(admin);
            return Ok(token);
        }

        [HttpPost("change-password")]
        [Authorize]
        public IActionResult ChangePassword([FromBody] ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var admin = _context.Admins.FirstOrDefault(a => a.Username == model.Username);
            if (admin == null)
                return NotFound(new { Error = "Admin not found" });

            if (admin.Password != model.OldPassword)
                return Unauthorized(new { Error = "Old password is incorrect" });

            admin.Password = model.NewPassword;
            _context.SaveChanges();

            return Ok(new { Message = "Password changed successfully" });
        }


        [HttpPost("create")]
        [Authorize]
        public async Task<IActionResult> Create([FromForm] Post post, IFormFile? imageFile)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            post.ImageUrl = await SaveImageAsync(imageFile, null);
            post.CreatedAt = DateTime.Now;

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return Ok(post);
        }

        [HttpPut("edit/{id}")]
        [Authorize]
        public async Task<IActionResult> Edit(int id, [FromForm] Post updatedPost, IFormFile? imageFile)
        {
            var existing = await _context.Posts.FindAsync(id);
            if (existing == null)
                return NotFound(new { Error = "Post not found" });

            existing.Title = updatedPost.Title;
            existing.Content = updatedPost.Content;
            existing.IsFeatured = updatedPost.IsFeatured;
            existing.VideoUrl = updatedPost.VideoUrl;

            if (imageFile != null && imageFile.Length > 0)
            {
                var oldImageUrl = existing.ImageUrl;
                existing.ImageUrl = await SaveImageAsync(imageFile, oldImageUrl);
            }

            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("delete/{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            var post = _context.Posts.FirstOrDefault(p => p.Id == id);
            if (post == null) return NotFound();

            if (!string.IsNullOrEmpty(post.ImageUrl))
            {
                var fileName = Path.GetFileName(new Uri(post.ImageUrl).AbsolutePath);
                var filePath = Path.Combine(_env.WebRootPath, "images", fileName); // <-- استخدمي _env
                if (System.IO.File.Exists(filePath))
                    System.IO.File.Delete(filePath);
            }

            _context.Posts.Remove(post);
            _context.SaveChanges();
            return NoContent();
        }

        private async Task<string?> SaveImageAsync(IFormFile? imageFile, string? oldImageUrl)
        {
            if (imageFile == null || imageFile.Length == 0) return oldImageUrl;

            var allowedTypes = new[] { "image/jpeg", "image/png", "image/gif", "image/webp" };
            if (!allowedTypes.Contains(imageFile.ContentType))
                throw new ArgumentException("نوع الصورة غير مدعوم.");

            if (imageFile.Length > 5 * 1024 * 1024)
                throw new ArgumentException("حجم الصورة أكبر من 5 ميجا.");

            // Delete old
            if (!string.IsNullOrEmpty(oldImageUrl))
            {
                var oldFileName = Path.GetFileName(new Uri(oldImageUrl).AbsolutePath);
                var oldFilePath = Path.Combine(_env.WebRootPath, "images", oldFileName);
                if (System.IO.File.Exists(oldFilePath))
                    System.IO.File.Delete(oldFilePath);
            }

            // Save new
            var folderPath = Path.Combine(_env.WebRootPath, "images");
            Directory.CreateDirectory(folderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            return $"{Request.Scheme}://{Request.Host}/images/{fileName}";
        }

        private TokenResponse GenerateJwtToken(Admin admin)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, admin.Username),
                new Claim(ClaimTypes.NameIdentifier, admin.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"] 
                ?? throw new InvalidOperationException("JWT Key is missing")));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddMinutes(60);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new TokenResponse
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                ExpiresAt = expires
            };
        }
    }
}