import { InformacionFecha } from './httpService';

export type TiposArchivo =
  | 'pdf'
  | 'word'
  | 'excel'
  | 'power'
  | 'zip'
  | 'file'
  | 'imagen';

export interface Documento extends InformacionFecha {
  id: number;
  id_area: number;
  id_user?: number;
  nombre_archivo?: string;
  uuid?: string;
  area?: string;
  extension?: string;
  activo?: number;
  file0?: any;
  nombreUsuario?: string;
}

export interface RespuestaDocumetosConsulta {
  documentos: Array<Documento>;
  ultimaActualizacion: Documento;
}
