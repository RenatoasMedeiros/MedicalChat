using System.ComponentModel.DataAnnotations;

namespace MedicChat.Application.Dtos
{
    public class PacienteDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="O campo {0} é obrigatorio.")]
        [MinLength(4, ErrorMessage ="O campo deve ter no minimo 4 caracteres.")]
        [MaxLength(100, ErrorMessage ="O campo só pode ter 100 caracteres.")]
        public string Nome { get; set; }
        [Required(ErrorMessage ="O campo {0} é obrigatorio.")]
        [EmailAddress(ErrorMessage = "O campo {0} precisa ser um e-mail válido.")]
        public string Email { get; set; }
        [Required(ErrorMessage ="O campo {0} é obrigatorio.")]
        [Phone(ErrorMessage="O campo {0} está com um numero inválido.")]
        public string Telemovel { get; set; }
        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage = "Não é uma imagem válida. Imagens válidas: (gif, jp(e)g, png ou bmp).")]
        public string Foto { get; set; }
        [Required(ErrorMessage ="O campo {0} é obrigatorio.")]
        public string DataNascimento { get; set; }
        public string Genero { get; set; }
        [Required(ErrorMessage ="O campo {0} é obrigatorio.")]
        [MinLength(6, ErrorMessage ="O campo deve ter no minimo 6 caracteres.")]
        [MaxLength(70, ErrorMessage ="O campo só pode ter 70 caracteres.")]
        public string Endereco { get; set; }
        [Required(ErrorMessage ="O campo {0} é obrigatorio.")]
        public string CodPostal { get; set; }

        // Propriedade de Navegação!
        // public IEnumerable<VideoChat> VideoChats { get; set; }
    }
}