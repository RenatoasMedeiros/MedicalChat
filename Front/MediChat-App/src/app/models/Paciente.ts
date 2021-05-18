import { VideoChat } from './VideoChat';
export interface Paciente {
  id: number;
  nome: string;
  email: string;
  telemovel: string;
  foto: string;
  dataNascimento: Date;
  genero: string;
  endereco: string;
  codPostal: string;
  videoChats: VideoChat;
}
