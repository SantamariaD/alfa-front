import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

/**
 * @Output clickCerrar envia el booleano que cierra el modal a la pantalla principal
 */
@Output() clickCerrar = new EventEmitter<any>();

/**
 * @Output clickCerrar envia el booleano que cierra el modal a la pantalla principal
 */
@Output() empActualizados = new EventEmitter<any>();

/**
   * @Variable seccionModal: contiene la seccion de la card que se mostrara en pantalla
   */
seccionModal = 'informacion';

  constructor() { }

  ngOnInit(): void {
  }

  //Metodo que manda la actualización del empleado a la vista para que se muestre

  ActualizaDatos(){
    this.empActualizados.emit();
  }


  //Metodo que cambia el valor de la seccion para que se muestre la de información.
  clickInformacion(){
    this.seccionModal = 'informacion';
  }

  //Metodo para cerrar el modal de la card
  clickCerrarModal(){
    this.clickCerrar.emit(false);
  }

  //Metodo que cambia el valor de la seccion para que se muestre la de información.
  clickAgregar(){
    this.seccionModal = 'editar';
  }

  //Metodo que cambia el valor de la seccion para que se muestre la de información.
  clickEditar(){
    this.seccionModal = 'eliminar';
  }

  //Metodo que cambia el valor de la seccion para que se muestre la de información.
  modalBorrar(empleado:any){

  }

}
