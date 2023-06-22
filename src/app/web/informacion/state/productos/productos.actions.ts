import { createAction, props } from '@ngrx/store';
import { Producto } from '../../interface/productos';

const GUARDAR_PRODUCTOS = '[Productos] Guarda los productos de la aplicación';

export const guardarProductos = createAction(
  GUARDAR_PRODUCTOS,
  props<{ productos: Array<Producto> }>()
);