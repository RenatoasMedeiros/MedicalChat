namespace MedicChat.Application.Dtos
{
    public class MedicoDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public int Telemovel { get; set; }
        public string Foto { get; set; }
        public string DataNascimento { get; set; }
        public string Genero { get; set; }
        public string Especialidade { get; set; }
        public string Descricao { get; set; }
        public string Endereco { get; set; }
        public string CodPostal { get; set; }
    }
}