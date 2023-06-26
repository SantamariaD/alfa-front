import { InformacionFecha } from './httpService';

export interface CatalogoProveedor extends InformacionFecha {
  id: number;
  idProveedor: number;
  idProducto: number;
  precioMaximoVenta: number;
  precioCompra: number;
  politicasVenta: string;
  nombreProducto: string;
  nombreProveedor: string;
  imagen: string;
  cantidadCompra: number;
  descuento: number;
  sku: string;
}

export interface BotonCarrito {
  nombreProducto: string;
  idProveedor: number;
}

export interface ClaveValor {
  clave: string;
  idProveedor: number;
  valor: Array<CatalogoProveedor>;
}

export interface OrdenCompraInfo {
  id: number;
  idProveedor: number;
  representanteVendedor: string;
  telefonoVendedor: string;
  correoVendedor: string;
  direccionVendedor: string;
  representanteComprador: string;
  telefonoComprador: string;
  correoComprador: string;
  direccionComprador: string;
  instruccionEspecial: string;
  subtotal: string;
  descuento: number;
  otros: number;
  iva: number;
  total: string;
}

export interface ProductoOrdenCompra {
  id: number;
  idOrdenCompra: number;
  idProveedor: number;
  idProducto: number;
  precioCompra: string;
  cantidadCompra: string;
  descuento: string;
}

export interface ConsultaOrdenCompra extends OrdenCompraInfo, InformacionFecha {
  catalogoProveedor: Array<CatalogoProveedor>;
}
