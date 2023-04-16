import { createAction, props } from '@ngrx/store';
import { UsuarioInterface } from 'src/app/web/informacion/interface/usuario';

const GUARDAR_USUARIO = '[Usuario] Guarda la información del usuario';
const BORRA_USUARIO = '[Usuario] borra la información del usuario';

export const guardarUsuario = createAction(
  GUARDAR_USUARIO,
  props<{ usuario: UsuarioInterface }>()
);

export const borraUsuario = createAction(
  BORRA_USUARIO,
);