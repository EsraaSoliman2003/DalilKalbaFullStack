using System.ComponentModel.DataAnnotations;

namespace CatBlog.Models
{
    public class ChangePasswordViewModel
    {
        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Old password is required")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "New password is required")]
        [MinLength(5, ErrorMessage = "New password must be at least 5 characters")]
        public string NewPassword { get; set; }
    }
}
