export interface Empleados {
  id: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombreCompleto:string;
  fecha_nacimiento: string;
  genero: string;
  estado_civil: string;
  curp: string;
  rfc: string;
  nss: string;
  direccion: string;
  telefono: string;
  correo_electronico: string;
  puesto: string;
  departamento: string;
  fecha_inicio: string;
  salario: string;
  horas_laborales: number;
  tipo_contrato: string;
  fecha_alta: string;
  fecha_baja: string;
  baja:number;
  fecha_reingreso:string;
}

export interface EmpleadosStore {
  Empleados: Array<Empleados>;
  proveedorSeleccionado: Empleados;
}

