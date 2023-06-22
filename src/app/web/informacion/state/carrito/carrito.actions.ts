import { createAction, props } from '@ngrx/store';
import { CatalogoProveedor } from '../../interface/catalogo-proveedores';

const GUARDAR_CARRITO = '[Carrito G] Guarda un producto al carrito';
const ELIMINAR_PRODUCTO_CARRITO = '[Carrito E] Elimina un producto al carrito';
const ACTUALIZAR_CANTIDAD_PRODUCTO_CARRITO = '[Carrito A] Actualiza el precio de un producto al carrito';

export const guardarProductoCarrito = createAction(
  GUARDAR_CARRITO,
  props<{ producto: CatalogoProveedor}>()
);

export const actualizarProductoCarrito = createAction(
  ACTUALIZAR_CANTIDAD_PRODUCTO_CARRITO,
  props<{ producto: CatalogoProveedor, cantidadCompra: number }>()
);

export const eliminarProductoCarrito = createAction(
  ELIMINAR_PRODUCTO_CARRITO,
  props<{ producto: CatalogoProveedor }>()
);
