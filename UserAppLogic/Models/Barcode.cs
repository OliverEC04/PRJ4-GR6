namespace BarcodeAPI.Data.Models;

public class Barcode
{
    public int id { get; set; }

    public long BarcodeId { get; set; }

    public string MealName { get; set; }

    public float Calories { get; set; }

    public float Protein { get; set; }

    public float Carbs { get; set; }

    public float Fat { get; set; }


    
}