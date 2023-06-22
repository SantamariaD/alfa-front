import { Action, createReducer, on } from '@ngrx/store';
import { CatalogoProveedor } from '../../interface/catalogo-proveedores';
import {
  eliminarProductoCarrito,
  guardarProductoCarrito,
} from './carrito.actions';

const estadoInicial: Array<CatalogoProveedor> = [];

const carritoReducer = createReducer(
  estadoInicial,
  on(guardarProductoCarrito, (state, { producto }) => {
    state.push(producto);
    return state;
  }),
  on(eliminarProductoCarrito, (state, { producto }) => {
    state = state.filter(
      (productoFIlter: CatalogoProveedor) => productoFIlter.id !== producto.id
    );
    return state;
  })
);

export function reducer(
  state: Array<CatalogoProveedor> | undefined,
  action: Action
): Array<CatalogoProveedor> {
  return carritoReducer(state, action);
}
