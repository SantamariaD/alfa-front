import { Action, createReducer, on } from '@ngrx/store';
import { Producto } from '../../interface/productos';
import {
  eliminarProductosCompraVenta,
  guardarProductosCompraVenta,
} from './productosCompraVenta.actions';

const estadoInicial: Array<Producto> = [];

const productosCompraVentaReducer = createReducer(
  estadoInicial,
  on(guardarProductosCompraVenta, (state, { productos }) => {
    state = productos;
    return state;
  }),
  on(eliminarProductosCompraVenta, (state) => {
    return [];
  })
);

export function reducer(
  state: Array<Producto> | undefined,
  action: Action
): Array<Producto> {
  return productosCompraVentaReducer(state, action);
}
