import { Action, createReducer, on } from '@ngrx/store';
import { CatalogoProveedor } from '../../interface/catalogo-proveedores';
import {
  actualizarProductoCarrito,
  eliminarProductoCarrito,
  guardarProductoCarrito,
  guardarProductosCarrito,
} from './carrito.actions';

const estadoInicial: Array<CatalogoProveedor> = [];

const carritoReducer = createReducer(
  estadoInicial,
  on(guardarProductoCarrito, (state, { producto }) => {
    state.push({ ...producto, cantidadCompra: 1 });
    return state;
  }),
  on(guardarProductosCarrito, (state, { productos }) => {
    state = productos;
    return state;
  }),
  on(eliminarProductoCarrito, (state, { producto }) => {
    state = state.filter(
      (productoFIlter: CatalogoProveedor) => productoFIlter.id !== producto.id
    );
    return state;
  }),
  on(actualizarProductoCarrito, (state, { producto, cantidadCompra }) => {
    state.map(
      (productoFIlter: CatalogoProveedor) => {
        if (productoFIlter.id == producto.idProducto) {
          productoFIlter.cantidadCompra = cantidadCompra
        }
      }
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
