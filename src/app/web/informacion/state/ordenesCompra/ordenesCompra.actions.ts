import { createAction, props } from '@ngrx/store';
import { ConsultaOrdenCompra } from '../../interface/catalogo-proveedores';

const GUARDAR_ORDENES_COMPRA = '[ORDENES] Guarda las Ordenes de compra.';
const GUARDAR_ORDEN_COMPRA = '[ORDENES] Guarda una Orden de compra.';
const ELIMINAR_ORDENES_COMPRA = '[ORDENES] Elimina las Ordenes de compra.';

export const guardarOrdenesCompra = createAction(
    GUARDAR_ORDENES_COMPRA,
  props<{ ordenesCompra: Array<ConsultaOrdenCompra> }>()
);

export const guardarOrdenCompra = createAction(
  GUARDAR_ORDEN_COMPRA,
props<{ ordenCompra: ConsultaOrdenCompra }>()
);

export const eliminarOrdenesCompra = createAction(ELIMINAR_ORDENES_COMPRA);