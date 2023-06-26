import { Action, createReducer, on } from '@ngrx/store';
import { ConsultaOrdenCompra } from '../../interface/catalogo-proveedores';
import { eliminarOrdenesCompra, guardarOrdenCompra, guardarOrdenesCompra } from './ordenesCompra.actions';

const estadoInicial: Array<ConsultaOrdenCompra> = [];

const ordenesCompraReducer = createReducer(
  estadoInicial,
  on(guardarOrdenesCompra, (state, { ordenesCompra }) => {
    state = ordenesCompra;
    return state;
  }),
  on(guardarOrdenCompra, (state, { ordenCompra }) => {
    state.push(ordenCompra);
    return state;
  }),
  on(eliminarOrdenesCompra, (state,) => {
    return [];
  })
);

export function reducer(
  state: Array<ConsultaOrdenCompra> | undefined,
  action: Action
): Array<ConsultaOrdenCompra> {
  return ordenesCompraReducer(state, action);
}