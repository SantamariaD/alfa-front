import { Action, createReducer, on } from '@ngrx/store';
import { Producto } from '../../interface/productos';
import { eliminarProductos, guardarProductos } from './productos.actions';

const estadoInicial: Array<Producto> = [];

const productosReducer = createReducer(
  estadoInicial,
  on(guardarProductos, (state, { productos }) => {
    state = productos;
    return state;
  }),
  on(eliminarProductos, (state,) => {
    return [];
  })
);

export function reducer(
  state: Array<Producto> | undefined,
  action: Action
): Array<Producto> {
  return productosReducer(state, action);
}
