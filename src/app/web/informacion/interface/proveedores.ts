import { InformacionFecha } from "./httpService";

export interface Proveedor extends  InformacionFecha{
    nombre: string;
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
