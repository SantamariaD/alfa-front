import { InformacionFecha } from "./httpService";
import { ProductoTicket } from "./productos";

export interface Ticket extends InformacionFecha {
    id:number;
    idEmpleado: number;
    idSucursal:string;
    idCliente: string;
    nombreEmpresa: string;
    nombreSucursale:string;
    nombreEmpleado: string;
    metodoPago: string;
    subtotal: number;
    iva:number;
    total:number;
    imagen?: string;
    productosVenta: ProductoTicket[];
}