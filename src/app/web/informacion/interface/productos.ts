export interface Producto {
  id: number;
  idCategoria: number;
  nombre: string;
  descripcion: string;
  codigoBarras: string;
  sku: string;
  categoria: string;
  proveedor: string;
  precioCompra: string;
  precioVenta: string;
  cantidadStock: string;
  ventas?: number;
  fechaCompra: string;
  imagen?: string;
  agotado?: boolean;
}
