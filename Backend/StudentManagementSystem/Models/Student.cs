using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace StudentManagementSystem.Models
{
    public class Student
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]// Auto-incremented primary key
        public int StudentId { get; set; }

        [Required]
        [MaxLength(50)]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]// Validates that the string is in email format
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Mobile must be a 10-digit number.")]// Validates that the mobile number is exactly 10 digits
        public string Mobile { get; set; }

        [Required]
        [MaxLength(20)]
        public string City { get; set; }
    }
}
