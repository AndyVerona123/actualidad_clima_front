import {Pais} from './Pais';

export class Estado {
  id: number;
  nombre: string;
  nombreCorto: string;
  habilitado: boolean;
  fkPais: number;
  pais: Pais;
}
