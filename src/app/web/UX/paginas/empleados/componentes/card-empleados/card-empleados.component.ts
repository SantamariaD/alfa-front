import { Component, Input, OnInit } from '@angular/core';
import { Empleados } from 'src/app/web/informacion/interface/empleados';

@Component({
  selector: 'app-card-empleados',
  templateUrl: './card-empleados.component.html',
  styleUrls: ['./card-empleados.component.scss']
})
export class CardEmpleadosComponent implements OnInit {

  /**
   * @Input empleado: contiene la info del empleado seleccionado
   */
@Input() empleado:Empleados = {} as Empleados;

/**
   * @Input mostrarCardEmpleados: recibe un booleano para abrir y cerrar el modal de la card de empleados
   */
@Input() mostrarCardEmpleado = false;

  constructor() { }

  ngOnInit(): void {
  }

}
