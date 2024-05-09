using System.Reflection.Metadata;
using UserBackend.Data.Models;

namespace BarcodeAPI.Data.Models;

public class Barcode
{
    public int Id { get; set; }

    public long BarcodeId { get; set; }

    public string MealName { get; set; }

    public float Calories { get; set; }

    public float Protein { get; set; }

    public float Carbs { get; set; }

    public float Fat { get; set; }

    public string AppUserId { get; set; } 
    
    
    public AppUser AppUser { get; set; } = null!;


}