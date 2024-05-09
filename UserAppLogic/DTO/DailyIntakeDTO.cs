using System.ComponentModel.DataAnnotations;

namespace UserBackend.Data.DTO
{
    public class DailyIntakeDTO
    {        
        
        [Range(0, int.MaxValue, ErrorMessage = "Current calories must be a positive number.")]
        public int? CurrentCalories { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Current protein must be a positive number.")]
        public int? CurrentProtein { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Current carbs must be a positive number.")]
        public int? CurrentCarbs { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Current fat must be a positive number.")]
        public int? CurrentFat { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Current water must be a positive number.")]
        public double? CurrentWater { get; set; }
    }
}