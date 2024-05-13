using System.ComponentModel.DataAnnotations;

namespace UserBackend.Data.DTO
{
    public class AppUserGoalDTO
    {
        [Range(0, double.MaxValue, ErrorMessage = "Target weight must be a positive number.")]
        public double? TargetWeight { get; set; }

        [Range(1, 1.9, ErrorMessage = "Activity level must be between 1 and 1,9.")]
        public double? activityLevel { get; set; }

        [RegularExpression("^(Easy|Medium|Hard)$", ErrorMessage = "Choose a difficulty level between Easy, Medium, or Hard.")]
        public string? difficultyLevel { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Daily water must be a positive number.")]
        public double? DailyWater { get; set; }
    }
}