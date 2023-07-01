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
