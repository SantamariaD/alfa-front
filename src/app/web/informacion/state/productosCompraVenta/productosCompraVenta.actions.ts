import { createAction, props } from '@ngrx/store';
import { Producto } from '../../interface/productos';

const GUARDAR_PRODUCTOS = '[Productos Compra Venta] Guarda los productos de compra con categoria venta de la aplicación';
const GUARDAR_UN_PRODUCTOS = '[Productos Compra Venta] Guarda un producto de compra con categoria venta de la aplicación';
const ELIMINAR_PRODUCTOS = '[Productos Compra Venta] Elimina los productos de compra con categoria venta de la aplicación';

export const guardarProductosCompraVenta = createAction(
  GUARDAR_PRODUCTOS,
  props<{ productos: Array<Producto> }>()
);

export const guardarProductoCompraVenta = createAction(
  GUARDAR_UN_PRODUCTOS,
  props<{ producto: Producto }>()
);

export const eliminarProductosCompraVenta = createAction(ELIMINAR_PRODUCTOS);