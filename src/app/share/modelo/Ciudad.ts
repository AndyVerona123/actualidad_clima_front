import {Estado} from './Estado';

export class Ciudad {
  id: number;
  nombre: string;
  nombreCorto: string;
  habilitado: boolean;
  fkEstado: number;
  estado: Estado;
  tieneSuscripcion: boolean;
}
