using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("BookGenre")]
    public class BookGenreModel
    {
        [Key]
        public int IdBook { get; set; }
        public int IdGenre { get; set; }
    }
}
