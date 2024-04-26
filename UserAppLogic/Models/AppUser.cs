using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace UserBackend.Data.Models
{
    public class AppUser : IdentityUser
    {
        [MaxLength(100)]
        public string? FullName { get; set; }

        
        [Range(0, double.MaxValue, ErrorMessage = "Current weight must be a positive number.")]
        public double? CurrentWeight { get; set; }

        
        [Range(0, double.MaxValue, ErrorMessage = "Target weight must be a positive number.")]
        public double? TargetWeight { get; set; }

        
        [Range(0, double.MaxValue, ErrorMessage = "Height must be a positive number.")]
        public double? Height { get; set; }

        
        [Range(0, int.MaxValue, ErrorMessage = "Age must be a positive number.")]
        public int? Age { get; set; }

        
        [RegularExpression("^(Male|Female)$", ErrorMessage = "Gender must be either Male or Female.")]
        public string? Gender { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Daily calories must be a positive number.")]
        public int? DailyCalories { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Protein must be a positive number.")]
        public int? DailyProtein { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Carbs must be a positive number.")]
        public int? DailyCarbs { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Fat must be a positive number.")]
        public int? DailyFat { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Current calories must be a positive number.")]
        public int? CurrentCalories { get; set; }
    }
}
