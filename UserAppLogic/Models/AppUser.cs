using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace UserBackend.Data.Models
{
    public class AppUser : IdentityUser
    {
        [Required(ErrorMessage = "Full name is required.")]
        [MaxLength(100)]
        public string? FullName { get; set; }

        [Required(ErrorMessage = "Current weight is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Current weight must be a positive number.")]
        public double? CurrentWeight { get; set; }

        [Required(ErrorMessage = "Target weight is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Target weight must be a positive number.")]
        public double? TargetWeight { get; set; }

        [Required(ErrorMessage = "Height is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Height must be a positive number.")]
        public double? Height { get; set; }

        [Required(ErrorMessage = "Age is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Age must be a positive number.")]
        public int? Age { get; set; }

        [Required(ErrorMessage = "Gender is required.")]
        [RegularExpression("^(Male|Female)$", ErrorMessage = "Gender must be either Male or Female.")]
        public string? Gender { get; set; }
    }
}
