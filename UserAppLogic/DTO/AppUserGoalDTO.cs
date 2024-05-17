using System.ComponentModel.DataAnnotations;

namespace UserBackend.Data.DTO
{
    public class AppUserGoalDTO
    {
        [Range(0, double.MaxValue, ErrorMessage = "Target weight must be a positive number.")]
        public float? TargetWeight { get; set; }

        [Range(1, 1.9, ErrorMessage = "Activity level must be between 1 and 1,9.")]
        public float? activityLevel { get; set; }

        [Range(200, 800, ErrorMessage = "Choose a difficulty level between Easy, Medium, or Hard.")]
        public float? difficultyLevel { get; set; }

        [Range(0, float.MaxValue, ErrorMessage = "Daily water must be a positive number.")]
        public float? DailyWater { get; set; }
    }
}