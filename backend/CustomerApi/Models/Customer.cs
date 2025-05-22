using System.ComponentModel.DataAnnotations;

namespace CustomerApi.Models;

public class Customer
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;
    
    [MaxLength(1000)]
    public string? Note { get; set; }
    
    [MaxLength(20)]
    public string? OrganizationNumber { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    [MaxLength(10)]
    public string? IndustryCode { get; set; }
    
    [MaxLength(200)]
    public string? IndustryDescription { get; set; }
} 