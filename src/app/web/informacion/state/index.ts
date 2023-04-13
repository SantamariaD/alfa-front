import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsuario from './usuario/usuario.reducer';
import * as fromHttp from './cargandoPeticion/cargandoPeticion.reducer'
import { UsuarioInterface } from '../interface/usuario';
import { CargandoPeticionInterface } from '../interface/httpService';

export interface AppState {
  usuario: UsuarioInterface;
  cargandoPeticion: CargandoPeticionInterface;
}

export const appReducers: ActionReducerMap<AppState> = {
  usuario: fromUsuario.reducer,
  cargandoPeticion: fromHttp.reducer,
};

//*********SELECTORES******/

//***** Features selectores****/

// Spinn cargando
export const selectCargandoPeticion = createFeatureSelector<CargandoPeticionInterface>('cargandoPeticion');

// Login
export const selectLoginPeticion = createFeatureSelector<UsuarioInterface>('login');

//usuario
export const selectUsuarioPeticion = createFeatureSelector<UsuarioInterface>('usuario');




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

