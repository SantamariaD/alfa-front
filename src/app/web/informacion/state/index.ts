import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUsuario from './usuario/usuario.reducer';
import * as fromHttp from './cargandoPeticion/cargandoPeticion.reducer';
import * as fromCarrito from './carrito/carrito.reducer';
import * as fromAreas from './areas/areas.reducer';
import * as fromProductos from './productos/productos.reducer';
import * as fromProveedores from './proveedores/proveedores.reducer';
import { UsuarioInterface } from '../interface/usuario';
import { CargandoPeticionInterface } from '../interface/httpService';
import { CatalogoProveedor } from '../interface/catalogo-proveedores';
import { Area } from '../interface/areas';
import { Producto } from '../interface/productos';
import { Proveedor, ProveedoresStore } from '../interface/proveedores';

export interface AppState {
  usuario: UsuarioInterface;
  cargandoPeticion: CargandoPeticionInterface;
  carrito: Array<CatalogoProveedor>;
  areas: Array<Area>;
  productos: Array<Producto>;
  proveedores: ProveedoresStore;
}

export const appReducers: ActionReducerMap<AppState> = {
  usuario: fromUsuario.reducer,
  cargandoPeticion: fromHttp.reducer,
  carrito: fromCarrito.reducer,
  areas: fromAreas.reducer,
  productos: fromProductos.reducer,
  proveedores: fromProveedores.reducer,
};

//*********SELECTORES******/

//***** Features selectores****/

// Spinn cargando
export const selectCargandoPeticion =
  createFeatureSelector<CargandoPeticionInterface>('cargandoPeticion');

// Login
export const selectLoginPeticion =
  createFeatureSelector<UsuarioInterface>('login');

//usuario
export const selectUsuarioPeticion =
  createFeatureSelector<UsuarioInterface>('usuario');

//Carrito
export const selectCarrito =
  createFeatureSelector<Array<CatalogoProveedor>>('carrito');

//Areas
export const selectAreas = createFeatureSelector<Array<Area>>('areas');

//Productos
export const selectProductos =
  createFeatureSelector<Array<Producto>>('producto');

//Proveedores
export const selectProveedores =
  createFeatureSelector<ProveedoresStore>('proveedores');

//****** Creando selectores*****/
export const selectBanderaCargandoPeticion = createSelector(
  selectCargandoPeticion,
  (state: CargandoPeticionInterface) => state.cargandoPeticion
);

// Login
export const selectBanderaLoginPeticion = createSelector(
  selectLoginPeticion,
  (state: UsuarioInterface) => state.login
);

export const selectInfoUsuarioPeticion = createSelector(
  selectUsuarioPeticion,
  (state: UsuarioInterface) => state
);

// Carrito
export const selectCarritoCompra = createSelector(
  selectCarrito,
  (state: Array<CatalogoProveedor>) => state
);

// Areas
export const selectAreasGuardadas = createSelector(
  selectAreas,
  (state: Array<Area>) => state
);

// Productos
export const selectProductosStore = createSelector(
  selectProductos,
  (state: Array<Producto>) => state
);

// Proveedores
export const selectProveedoresStore = createSelector(
  selectProveedores,
  (state: ProveedoresStore) => state
);


