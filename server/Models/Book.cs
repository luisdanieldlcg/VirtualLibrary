using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("Book")]
    public class BookModel
    {
        [Key]
        public string IdBook { get; set; }
        public string Title { get; set; }
        public string Sypnosis { get; set; }
        public string AuthorName { get; set; }
        public DateTime PublicationYear { get; set; }
        public string LinkPDF { get; set; }
        public int IdCategory { get; set; }
    }
}
