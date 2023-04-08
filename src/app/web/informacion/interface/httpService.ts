export interface HttpClientServiceInterface<T> {
  codigo: number;
  mensaje: string;
  error?: any
  payload: T;
}

export interface HttpClientServiceInterfaceNoPayload {
  codigo: number;
  mensaje: string;
  error?: any
}


export interface CargandoPeticionInterface {
  cargandoPeticion: boolean;
}

export interface InformacionFecha {
  created_at?: string;
  updated_at?: string;
}
