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
  agotado?: boolean;
}

export interface ProductoVenta extends InformacionFecha {
  id: number;
  idCategoria: number;
  nombreProducto: string;
  precioVenta: number;
  descripcion: string;
  codigoBarras: string;
  sku: string;
  categoria: string;
  cantidadStock: number;
  ventasTotales: number;
  agotado: boolean;
}
