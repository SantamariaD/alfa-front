import { Component, OnInit } from '@angular/core';
import { Empleados } from 'src/app/web/informacion/interface/empleados';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  /**
   * @variable seccion: Contiene la seccione actual
   */
  seccion = 'Lista de empleados';

  /**
   * @variable empleado:contiene el objeto de empleado que viene desde la card
   */
empleado:Empleados = {} as Empleados

/**
   * @variable secciones: Contiene las secciones de empleados
   */
  secciones = [
    { texto: 'Lista de empleados', seleccionado: true },
    { texto: 'Documentos de empleado', seleccionado: false },
    { texto: 'Solicitudes de empleado', seleccionado: false },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  selectSeccion(cabecera:string){
    this.seccion = cabecera;
  }

  verDocumentos(empleadoPantalla:any){
this.empleado = empleadoPantalla.empleado;
this.seccion = empleadoPantalla.pantalla;
  }

}
