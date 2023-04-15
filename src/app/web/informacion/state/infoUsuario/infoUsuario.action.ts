import { createAction, props } from '@ngrx/store';
import {  infoUsuarioInterface } from 'src/app/web/informacion/interface/usuario';

const GUARDAR_INFOUSUARIO = '[Usuario] Guarda la información del usuario';
const BORRAR_INFOUSUARIO = '[Usuario] Guarda la información del usuario';

export const guardarInfoUsuario = createAction(
  GUARDAR_INFOUSUARIO,
  props<{ infoUsuario: infoUsuarioInterface }>()
);

export const borrarInfoUsuario = createAction(
    BORRAR_INFOUSUARIO
  );