import { createAction, props } from '@ngrx/store';
import { Area } from '../../interface/areas';
import { Empleados } from '../../interface/empleados';

const GUARDAR_EMPLEADOS = '[Empledos] Guarda los empleados de la aplicación';
const GUARDAR_EMPLEADO = '[Empleado] Guarda un proveedor de la aplicación';
const GUARDAR_EMPLEADO_SELECCIONADO =
  '[Empleados] Guarda el empleado seleccionado de la lista';

export const guardarEmpleados = createAction(
    GUARDAR_EMPLEADOS,
  props<{ empleados: Array<Empleados> }>()
);

export const guardarEmpleado = createAction(
  GUARDAR_EMPLEADO,
  props<{ empleado: Empleados }>()
);

export const guardarEmpleadoSeleccionado = createAction(
  GUARDAR_EMPLEADO_SELECCIONADO,
  props<{ empleado: Empleados }>()
);