import { InformacionFecha } from "./httpService";
import { ProductoTicket } from "./productos";

export interface Ticket extends InformacionFecha {
    id:number;
    idEmpleado: number;
    idSucursal:string;
    idCliente: string;
    nombreEmpresa: string;
    nombreSucursal:string;
    nombreEmpleado: string;
    metodoPago: TipoPago[];
    subtotal: number;
    iva:number;
    total:number;
    imagen?: string;
    productosVenta: ProductoTicket[];
}

export interface TipoPago {
    tipo: string;
    monto: number;
}