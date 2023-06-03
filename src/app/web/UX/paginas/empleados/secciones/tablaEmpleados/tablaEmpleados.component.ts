import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { Empleados } from 'src/app/web/informacion/interface/empleados';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { ColumnaTabla } from 'src/app/web/informacion/interface/tabla';
import { EmpleadosService } from 'src/app/web/informacion/servicios/empleados/empleados.service';

@Component({
  selector: 'app-tablatablaEmpleados',
  templateUrl: './tablaEmpleados.component.html',
  styleUrls: ['./tablaEmpleados.component.scss']
})
export class TablaEmpleadosComponent implements OnInit {

  /**
   * @variable mostrarCardEmpleados: es un booleano para abrir y cerrar el modal de la card de empleados
   */
  mostrarCardEmpleado = false;

  /**
   * @variable empleados: trae el empleado seleccionado en la tabla
   */
  empleado:Empleados = {} as Empleados;

  /**
   * @variable empleados: trae el array de todos los empleados
   */
  empleados:Empleados[] = [];

  /**
   * @variable columnasTabla: Columnas que contiene la tabla
   */
  columnasTabla: Array<ColumnaTabla> = [
    { columna: 'Nombre', llave: 'nombres', busqueda: true },
    { columna: 'Fecha de creación', llave: 'fecha_nacimiento', busqueda: true },
    { columna: 'Fecha de Modificación', llave: 'genero', busqueda: true },
    { columna: 'Páginas', llave: 'estado_civil', busqueda: true },
    { columna: 'Clasificación', llave: 'curp', busqueda: true },

  ];

  constructor(private empleadoServise:EmpleadosService) { }

  ngOnInit(): void {
    this.traerTodosEmpleados();
  }

//Metodo para traer todos los empleados
traerTodosEmpleados(){
this.empleadoServise.traerTodosEmpleados().subscribe({
    next:( empleados: HttpClientServiceInterface<Array<Empleados>>) => {
    this.empleados = empleados.payload
    }, error: error => console.log(error)
})
}

//Metodo para traer al empleado seleccionado en la fila
clickFila(empleado:Empleados){
this.empleado = empleado;
}


clickCerrarModal(cerrar:any){
  this.mostrarCardEmpleado = cerrar;
}

ActualizaDatos(){
  this.traerTodosEmpleados();
}

}
