using System.Reflection.Metadata;
using System.Text.Json.Serialization;
using UserBackend.Data.Models;

namespace BarcodeAPI.Data.Models;
public class ImageEntity
{
    public int Id { get; set; }
    public byte[] Data { get; set; }
    public string ContentType { get; set; }
    public string Name { get; set; }
    public string AppUserId { get; set; } 
    [JsonIgnore]
    public AppUser AppUser { get; set; }
}