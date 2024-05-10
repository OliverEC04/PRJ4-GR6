using System.ComponentModel.DataAnnotations;
using BarcodeAPI.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Hosting;

namespace UserBackend.Data.Models
{
    public class AppUser : IdentityUser
    {
        [MaxLength(100)]
        public string? FullName { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Height must be a positive number.")]
        public double? Height { get; set; }

        [RegularExpression("^(Male|Female)$", ErrorMessage = "Gender must be either Male or Female.")]
        public string? Gender { get; set; }
        
        [Range(0, double.MaxValue, ErrorMessage = "Current weight must be a positive number.")]
        public double? CurrentWeight { get; set; }
        
        [Range(0, double.MaxValue, ErrorMessage = "Target weight must be a positive number.")]
        public double? TargetWeight { get; set; }

        [Range(1, 1.9, ErrorMessage = "Activity level must be between 1 and 1,9.")]
        public double? activityLevel { get; set; }

        [RegularExpression("^(Easy|Medium|Hard)$", ErrorMessage = "Choose a difficulty level between Easy, Medium, or Hard.")]
        public string? difficultyLevel { get; set; }
        
        [Range(0, int.MaxValue, ErrorMessage = "Current calories must be a positive number.")]
        public float CurrentCalories { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Daily calories must be a positive number.")]
        public float DailyCalories { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Daily protein must be a positive number.")]
        public float DailyProtein { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Current protein must be a positive number.")]
        public float CurrentProtein { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Daily carbs must be a positive number.")]
        public float DailyCarbs { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Current carbs must be a positive number.")]
        public float CurrentCarbs { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Daily fat must be a positive number.")]
        public float DailyFat { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Current fat must be a positive number.")]
        public float CurrentFat { get; set; }
        
        [Range(0, int.MaxValue, ErrorMessage = "Age must be a positive number.")]
        public int Age { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Daily water must be a positive number.")]
        public double? DailyWater { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Current water must be a positive number.")]
        public double? CurrentWater { get; set; }

        public ICollection<Barcode> Barcodes { get; set;} = new List<Barcode>();
    }
}
