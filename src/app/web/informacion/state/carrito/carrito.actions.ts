import { createAction, props } from '@ngrx/store';
import { CatalogoProveedor } from '../../interface/catalogo-proveedores';

const GUARDAR_CARRITO = '[Carrito] Guarda un producto al carrito';

export const guardarProductoCarrito = createAction(
  GUARDAR_CARRITO,
  props<{ producto: CatalogoProveedor }>()
);
