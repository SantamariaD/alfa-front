import { Action, createReducer, on } from '@ngrx/store';
import { ProveedoresStore } from '../../interface/proveedores';
import {
  guardarCatalogoProveedor,
  guardarComprar,
  guardarProveedor,
  guardarProveedores,
  guardarProveedorSeleccionado,
} from './proveedores.actions';

const estadoInicial: ProveedoresStore = {} as ProveedoresStore;

const proveedoresReducer = createReducer(
  estadoInicial,
  on(guardarProveedores, (state, { proveedores }) => {
    return {
      ...state,
      proveedores,
    };
  }),
  on(guardarProveedor, (state, { proveedor }) => {
    state.proveedores.push(proveedor);
    return state;
  }),
  on(guardarProveedorSeleccionado, (state, { proveedor }) => {
    return {
      ...state,
      proveedorSeleccionado: proveedor,
    };
  }),
  on(guardarCatalogoProveedor, (state, { catalogo }) => {
    return {
      ...state,
      catalogoProveedor: catalogo,
    };
  })
  ,
  on(guardarComprar, (state, { comprar }) => {
    return {
      ...state,
      comprar,
    };
  })
);

export function reducer(
  state: ProveedoresStore | undefined,
  action: Action
): ProveedoresStore {
  return proveedoresReducer(state, action);
}
