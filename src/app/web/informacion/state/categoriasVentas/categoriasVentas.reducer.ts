import { Action, createReducer, on } from '@ngrx/store';
import { Categoria } from '../../interface/categorias';
import { guardarCategoriasVentas } from './categoriasVentas.actions';

const estadoInicial: Array<Categoria> = [];

const categoriasVentasReducer = createReducer(
  estadoInicial,
  on(guardarCategoriasVentas, (state, { categorias }) => {
    state = categorias;
    return state;
  })
);

export function reducer(
  state: Array<Categoria> | undefined,
  action: Action
): Array<Categoria> {
  return categoriasVentasReducer(state, action);
}
