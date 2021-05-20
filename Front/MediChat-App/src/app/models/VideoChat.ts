import { Medico } from './Medico';
import { Paciente } from './Paciente';
import { VideoChatStatus } from './VideoChatStatus';

export interface VideoChat {
  id: number;
  relatorio: string;
  token: string;
  dataInicio: Date;
  dataFim?: Date;
  estadoVideoChat: VideoChatStatus;
  medicoID: number;
  medico: Medico;
  pacienteID: number;
  paciente: Paciente;
}
