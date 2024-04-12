using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("Category")]
    public class CategoryModel
    {
        [Key]
        public string IdCategory { get; set; }
        public string CategoryName { get; set; }
    }
}