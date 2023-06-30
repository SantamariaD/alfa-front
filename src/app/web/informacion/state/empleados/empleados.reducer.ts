import { Action, createReducer, on } from '@ngrx/store';
import { Empleados, EmpleadosStore } from '../../interface/empleados';
import {
    guardarEmpleados,
    guardarEmpleado,
    guardarEmpleadoSeleccionado
} from './empleados.actions';

const estadoInicial: EmpleadosStore = {} as EmpleadosStore;

const empleadosReducer = createReducer(
  estadoInicial,
  on(guardarEmpleados, (state, { empleados }) => {
    return {
      ...state,
      empleados,
    };
  }),
  on(guardarEmpleado, (state, { empleado }) => {
    state.Empleados.push(empleado);
    return state;
  }),
  on(guardarEmpleadoSeleccionado, (state, { empleado }) => {
    return {
      ...state,
      empleadoSeleccionado: empleado,
    };
  }),
);

export function reducer(
  state: EmpleadosStore | undefined,
  action: Action
): EmpleadosStore {
  return empleadosReducer(state, action);
}
