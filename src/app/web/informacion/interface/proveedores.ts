import { CatalogoProveedor } from './catalogo-proveedores';
import { InformacionFecha } from './httpService';

export interface Proveedor extends InformacionFecha {
  nombre: string;
  representante: string;
  telefono: string;
  domicilio: string;
  correo: string;
  sitioWeb: string;
  id: number;
}

export interface RespuestaProveedores {
  proveedores: Array<Proveedor>;
  utlimaActualizacion: Proveedor;
}

export interface ProveedoresStore {
  proveedores: Array<Proveedor>;
  proveedorSeleccionado: Proveedor;
  catalogoProveedor: Array<CatalogoProveedor>;
  comprar: boolean;
  ultimaActualizacion: any;
}
