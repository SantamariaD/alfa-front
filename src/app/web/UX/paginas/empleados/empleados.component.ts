import { Component, OnInit } from '@angular/core';

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

}
