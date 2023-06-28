import { createAction, props } from '@ngrx/store';
import { Categoria } from '../../interface/categorias';

const GUARDAR_CATEGORIAS = '[Categorias] Guarda las categorias de la aplicación';

export const guardarCategorias = createAction(
    GUARDAR_CATEGORIAS,
  props<{ categorias: Array<Categoria> }>()
);