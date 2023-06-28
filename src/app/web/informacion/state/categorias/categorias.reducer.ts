import { Action, createReducer, on } from '@ngrx/store';
import { guardarCategorias } from './categorias.actions';
import { Categoria } from '../../interface/categorias';

const estadoInicial: Array<Categoria> = [];

const categoriasReducer = createReducer(
  estadoInicial,
  on(guardarCategorias, (state, { categorias }) => {
    state = categorias;
    return state;
  })
);

export function reducer(
  state: Array<Categoria> | undefined,
  action: Action
): Array<Categoria> {
  return categoriasReducer(state, action);
}
