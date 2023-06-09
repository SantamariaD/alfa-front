import { createAction, props } from '@ngrx/store';
import { ProductoVenta } from '../../interface/productos';

const GUARDAR_PRODUCTOS =
  '[Productos venta] Guarda los productos de venta de la aplicación';
const ELIMINAR_PRODUCTOS =
  '[Productos venta] Elimina los productos de venta de la aplicación';

export const guardarProductosVentas = createAction(
  GUARDAR_PRODUCTOS,
  props<{ productos: Array<ProductoVenta> }>()
);

export const eliminarProductosVentas = createAction(ELIMINAR_PRODUCTOS);
