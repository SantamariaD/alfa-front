export interface HttpClientServiceInterface<T> {
  code: number;
  message: string;
  payload: T;
}

export interface HttpClientServiceInterfaceNoPayload {
  code: number;
  message: string;
}

export interface CargandoPeticionInterface {
  cargandoPeticion: boolean;
}

export interface InformacionFecha {
  created_at?: string;
  updated_at?: string;
}
