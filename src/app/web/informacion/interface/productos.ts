import { InformacionFecha } from "./httpService";

export interface Producto {
  id: number;
  idCategoria: number;
  nombre: string;
  descripcion: string;
  codigoBarras: string;
  sku: string;
  categoria: string;
  cantidadStock: number;
  comprasTotales: number;
  agotado: boolean;
  eliminado: boolean;
}

export interface ProductoVenta extends InformacionFecha {
  id: number;
  idCategoria: number;
  nombreProducto: string;
  precioVenta: string;
  precioCompra: string;
  descuento: number;
  descripcion: string;
  codigoBarras: string;
  sku: string;
  categoria: string;
  cantidadStock: number;
  ventasTotales: number;
  agotado: boolean;
  eliminado: boolean;
  stockCompras: boolean;
}

export interface ProductoTicket extends ProductoVenta {
  cantidad: number;
  total: any;
}
