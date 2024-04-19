using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace UserBackend.Data.Models
{
    public class AppUser : IdentityUser
    {
        [MaxLength(100)]
        public string? FullName { get; set; }
    }
}
