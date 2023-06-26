import { createAction, props } from '@ngrx/store';
import { CatalogoProveedor } from '../../interface/catalogo-proveedores';
import { Proveedor } from '../../interface/proveedores';

const GUARDAR_PROVEEDORES =
  '[Prodveedores] Guarda los proveedores de la aplicación';
  const GUARDAR_PROVEEDOR =
  '[Prodveedores] Guarda un proveedor de la aplicación';
const GUARDAR_PROVEEDOR_SELECCIONADO =
  '[Proveedores] Guarda el proveedor seleccionado del catálogo';
const GUARDAR_PROVEEDOR_CATALOGO =
  '[Proveedores] Guarda el catálogo del proveedor seleccionado';
const GUARDAR_SWITCH_COMPRAR =
  '[Proveedores] Guarda el evento del switch al comprar';

export const guardarProveedores = createAction(
  GUARDAR_PROVEEDORES,
  props<{ proveedores: Array<Proveedor> }>()
);

export const guardarProveedor = createAction(
  GUARDAR_PROVEEDOR,
  props<{ proveedor: Proveedor }>()
);

export const guardarProveedorSeleccionado = createAction(
  GUARDAR_PROVEEDOR_SELECCIONADO,
  props<{ proveedor: Proveedor }>()
);

export const guardarCatalogoProveedor = createAction(
  GUARDAR_PROVEEDOR_CATALOGO,
  props<{ catalogo: Array<CatalogoProveedor> }>()
);

export const guardarComprar = createAction(
  GUARDAR_SWITCH_COMPRAR,
  props<{ comprar: boolean }>()
);
