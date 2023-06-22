import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
   * @Output documentos envia el string que cierra el modal y redirige a documentosEmpleado
   */
   @Output() documentos = new EventEmitter<any>();

  /**
   * @variable mostrarCardEmpleados: es un booleano para abrir y cerrar el modal de la card de empleados
   */
  mostrarCardEmpleado = false;

  /**
   * @variable empleados: trae el empleado seleccionado en la tabla
   */
  empleado:Empleados = {} as Empleados;

  /**
   * @variable despidos: trae los empleados despedidos en los ultimos tres meses
   */
  despidos:Empleados[] = [];


  /**
   * @variable despidos: trae los empleados contratados en los ultimos tres meses
   */
  contratados:Empleados[] = [];

  /**
   * @variable empleados: trae el array de todos los empleados
   */
  empleados:Empleados[] = [];

  /**
 * 
 * @variable switchValue 
 */
switchValue = false;

  /**
   * @variable columnasTabla: Columnas que contiene la tabla
   */
  columnasTabla: Array<ColumnaTabla> = [
    { columna: 'Nombre', llave: 'nombreCompleto', busqueda: true },
    { columna: 'Curp', llave: 'curp', busqueda: true },
    { columna: 'Departamento', llave: 'departamento', busqueda: true },
    { columna: 'Domicilio', llave: 'direccion', busqueda: true },
    { columna: 'Teléfono', llave: 'telefono', busqueda: true },
    { columna: 'Sueldo', llave: 'salario', busqueda: true }

  ];

  constructor(private empleadoServise:EmpleadosService) { }

  ngOnInit(): void {
    this.traerTodosEmpleados();
   console.log(this.empleado);
  }

//Metodo para traer todos los empleados
traerTodosEmpleados(){
this.empleadoServise.traerTodosEmpleados().subscribe({
    next:( empleados: HttpClientServiceInterface<Array<Empleados>>) => {
    this.empleados = empleados.payload
    this.empleados.forEach(element => {
      element.nombreCompleto = element.nombres + ' ' + element.apellido_materno + ' ' + element.apellido_paterno;
    });
    this.calculosEmpleados();
    }, error: error => console.log(error)
})
}

//Metodo para traer al empleado seleccionado en la fila
clickFila(empleado:Empleados){
this.empleado = empleado;
this.mostrarCardEmpleado = true;
    if(empleado.baja !== 1){
      this.switchValue = true;
    }else{
      this.switchValue = false;
    }
}


clickCerrarModal(cerrar:any){
  this.mostrarCardEmpleado = cerrar;
}

ActualizaDatos(actualiza:boolean){
  this.empleados = [];
  this.traerTodosEmpleados();
  this.mostrarCardEmpleado = false;
}

docEmpleado(docEmpleados:object){
this.documentos.emit(docEmpleados);
}

// Este metodo calcula las altas bajas y faltas de los empleados
calculosEmpleados(){
  this.contratados = [];
  this.despidos = [];
  const obtenerFecha:Date = new Date();
  const anioActual = obtenerFecha.getFullYear();
  const mesActual = obtenerFecha.getMonth() + 1;
this.empleados.forEach(empleado =>{
  if(empleado.baja === 1){
   const fechaLong = empleado.fecha_baja.split('-')
   const fechaAnio = parseInt(fechaLong[0]);
   const fechaMes = parseInt(fechaLong[1]);
if(anioActual === fechaAnio && mesActual === fechaMes || mesActual - 3 <= fechaMes){
this.despidos.push(empleado);
}
  }else{
if(empleado.fecha_reingreso !== null){
  const fechaLong = empleado.fecha_reingreso.split('-')
  const fechaAnio = parseInt(fechaLong[0]);
  const fechaMes = parseInt(fechaLong[1]);
  if(anioActual === fechaAnio && mesActual === fechaMes || mesActual - 3 <= fechaMes){
    this.contratados.push(empleado);
    }
}else{
  const fechaLong = empleado.fecha_alta.split('-')
  const fechaAnio = parseInt(fechaLong[0]);
  const fechaMes = parseInt(fechaLong[1]);
  if(anioActual === fechaAnio && mesActual === fechaMes || mesActual - 3 <= fechaMes){
    this.contratados.push(empleado);
    }
}
  }
})
}
}
