import { Action, createReducer, on } from '@ngrx/store';
import { ProductoVenta } from '../../interface/productos';
import {
  eliminarProductosVentas,
  guardarProductosVentas,
} from './stockVentas.actions';

const estadoInicial: Array<ProductoVenta> = [];

const stockVentasReducer = createReducer(
  estadoInicial,
  on(guardarProductosVentas, (state, { productos }) => {
    state = productos;
    return state;
  }),
  on(eliminarProductosVentas, (state) => {
    return [];
  })
);

export function reducer(
  state: Array<ProductoVenta> | undefined,
  action: Action
): Array<ProductoVenta> {
  return stockVentasReducer(state, action);
}
