import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Empleados } from 'src/app/web/informacion/interface/empleados';
import { HttpClientServiceInterfaceNoPayload } from 'src/app/web/informacion/interface/httpService';
import { EmpleadosService } from 'src/app/web/informacion/servicios/empleados/empleados.service';

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

/**
 * 
 * @variable switchValue 
 */
switchValue = false;

  constructor( private modal: NzModalService, private empleadoServise:EmpleadosService) { }

  ngOnInit(): void {
  }

  //Metodo que manda la actualización del empleado a la vista para que se muestre

  ActualizaDatos(actualiza:boolean){
    this.empActualizados.emit(actualiza);
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
    this.seccionModal = 'agregar';
  }

  //Metodo que cambia el valor de la seccion para que se muestre la de información.
  clickEditar(){
    this.seccionModal = 'editar';
  }

  // Modal borrar
   modalBorrar(empleado: Empleados): void {
    this.mostrarCardEmpleado = false;
    this.modal.confirm({
      nzTitle: '¿Está seguro que desea borrar al empleado ' +  empleado.nombreCompleto + '?',
      nzContent:
        '<b style="color: red;"Este documento se ira a la papelera de resiclaje</b>',
      nzOkText: 'Si',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {this.borrarEmpleado(), this.empActualizados.emit()},
      nzOnCancel: () => this.mostrarCardEmpleado = true,
    });
  }

  borrarEmpleado(){
    const id = parseInt(this.empleado.id, 10);
this.empleadoServise.eliminarEmpleado(id).subscribe({
  next:( empleado: HttpClientServiceInterfaceNoPayload)=>{
    console.log(empleado)
  }, error: error => console.log(error)
})
  }

}
