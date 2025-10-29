using System;
using System.ComponentModel.DataAnnotations;

namespace CatBlog.Models
{
    public class News
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(300)]
        public string Text { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
