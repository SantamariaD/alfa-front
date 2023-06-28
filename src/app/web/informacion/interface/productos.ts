export interface Producto {
  id: number;
  idCategoria: number;
  nombre: string;
  descripcion: string;
  codigoBarras: string;
  sku: string;
  categoria: string;
  proveedor: string;
  precioVenta: string;
  cantidadStock: number;
  ventas?: number;
  fechaCompra: string;
  imagen?: string;
  agotado?: boolean;
}
