import { VideoChat } from "./VideoChat";

export interface Medico {
  id: number;
  username: string;
  email: string;
  telemovel: string;
  foto: string;
  dataNascimento: Date;
  genero: string;
  especialidade: string;
  endereco: string;
  codPostal: string;
  videoChats: VideoChat;
}
