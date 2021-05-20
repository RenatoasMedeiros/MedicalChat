using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MedicChat.Domain.model;

namespace MedicChat.Application.Dtos
{
    public class MedicoDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="O campo {0} é obrigatorio")]
        [MinLength(4)]
        [MaxLength(100)]
        public string Nome { get; set; }
        [Required(ErrorMessage ="O campo {0} é obrigatorio")]
        [EmailAddress(ErrorMessage = "O campo {0} precisa ser um e-mail válido")]
        public string Email { get; set; }
        [Required(ErrorMessage ="O campo {0} é obrigatorio.")]
        [Phone(ErrorMessage="O campo {0} está com um numero inválido.")]
        public string Telemovel { get; set; }
        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage = "Não é uma imagem válida. Imagens válidas: (gif, jpg, png ou bmp).")]
        public string Foto { get; set; }
        [Required(ErrorMessage ="O campo {0} é obrigatorio")]
        public string DataNascimento { get; set; }
        public string Genero { get; set; }
        [Required(ErrorMessage ="O campo {0} é obrigatorio")]
        public string Especialidade { get; set; }
        [MaxLength(200)]
        public string Descricao { get; set; }
        [Required(ErrorMessage ="O campo {0} é obrigatorio")]
        [MinLength(6)]
        [MaxLength(70)]
        public string Endereco { get; set; }
        [Required(ErrorMessage ="O campo {0} é obrigatorio")]
        public string CodPostal { get; set; }

        // public IEnumerable<VideoChat> VideoChats { get; set; }

    }
}