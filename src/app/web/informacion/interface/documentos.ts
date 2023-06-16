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
  id_emp?:number;
  nombre_archivo?: string;
  uuid?: string;
  area?: string;
  extension?: string;
  activo?: number;
  file0?: any;
  nombreUsuario?: string;
  estatus?:string;
}

export interface RespuestaDocumetosConsulta {
  payload?:Array<Documento>;
  documentos: Array<Documento>;
  ultimaActualizacion: Documento;
}
