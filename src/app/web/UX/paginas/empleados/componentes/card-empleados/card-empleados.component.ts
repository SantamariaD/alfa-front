import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Empleados } from 'src/app/web/informacion/interface/empleados';
import { HttpClientServiceInterfaceNoPayload } from 'src/app/web/informacion/interface/httpService';
import { EmpleadosService } from 'src/app/web/informacion/servicios/empleados/empleados.service';

@Component({
  selector: 'app-card-empleados',
  templateUrl: './card-empleados.component.html',
  styleUrls: ['./card-empleados.component.scss'],
})
export class CardEmpleadosComponent implements OnInit, OnDestroy {
  /**
   * @Input empleado: contiene la info del empleado seleccionado
   */
  @Input() empleado: Empleados = {} as Empleados;

  /**
   * @Input mostrarCardEmpleados: recibe un booleano para abrir y cerrar el modal de la card de empleados
   */
  @Input() mostrarCardEmpleado = false;

  /**
   *
   * @variable switchValue
   */
  @Input() switchValue = false;

  /**
   * @Output clickCerrar envia el booleano que cierra el modal a la pantalla principal
   */
  @Output() clickCerrar = new EventEmitter<any>();

  /**
   * @Output clickCerrar envia el booleano que cierra el modal a la pantalla principal
   */
  @Output() empActualizados = new EventEmitter<any>();

   /**
   * @Output docEmpleado envia el string que cierra el modal y redirige a documentosEmpleado
   */
   @Output() docEmpleado = new EventEmitter<any>();

  /**
   * @Variable seccionModal: contiene la seccion de la card que se mostrara en pantalla
   */
  seccionModal = 'informacion';

  constructor(
    private modal: NzModalService,
    private empleadoServise: EmpleadosService
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.empleado = {} as Empleados;
  }

  //Metodo que manda la actualización del empleado a la vista para que se muestre

  ActualizaDatos(actualiza: boolean) {
    this.empActualizados.emit(actualiza);
  }

  //Metodo que cambia el valor de la seccion para que se muestre la de información.
  clickInformacion() {
    this.seccionModal = 'informacion';
  }

  //Metodo para cerrar el modal de la card
  clickCerrarModal() {
    this.clickCerrar.emit(false);
  }

  //Metodo que cambia el valor de la seccion para que se muestre la de información.
  clickAgregar() {
    this.seccionModal = 'agregar';
  }

  //Metodo que cambia el valor de la seccion para que se muestre la de información.
  clickEditar() {
    this.seccionModal = 'editar';
  }

  // Modal de confirmacion para borrar empleados
  modalBorrar(empleado: Empleados): void {
    this.mostrarCardEmpleado = false;
    this.modal.confirm({
      nzTitle:
        '¿Está seguro que desea borrar al empleado ' +
        empleado.nombreCompleto +
        '?',
      nzContent:
        '<b style="color: red;"Este documento se ira a la papelera de resiclaje</b>',
      nzOkText: 'Si',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.borrarEmpleado(), this.empActualizados.emit();
      },
      nzOnCancel: () => (this.mostrarCardEmpleado = true),
    });
  }

  // Modal de confirmación para dar de baja o dar de alta a un empleado
  modalBajaAlta(empleado: Empleados): void {
    console.log(this.switchValue)
    this.mostrarCardEmpleado = false;
    let titulo: string;
    if (this.switchValue === true) {
      titulo =
        '¿Está seguro que deseas dar de baja al empleado ' +
        empleado.nombreCompleto +
        '?';
    } else {
      titulo =
        '¿Está seguro que deseas dar de alta nuevamente al empleado ' +
        empleado.nombreCompleto +
        '?';
    }
    this.modal.confirm({
      nzTitle:titulo,
      nzContent:
        '<b style="color: red;"Este documento se ira a la papelera de resiclaje</b>',
      nzOkText: 'Si',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.actualizarEmpleado();
      },
      nzOnCancel: () => (this.mostrarCardEmpleado = true),
    });
  }

  //Metodo para eliminar a un empleado de la lista
  borrarEmpleado() {
    const id = parseInt(this.empleado.id, 10);
    this.empleadoServise.eliminarEmpleado(id).subscribe({
      next: (empleado: HttpClientServiceInterfaceNoPayload) => {
        console.log(empleado);
      },
      error: (error) => console.log(error),
    });
  }

  //Este metodo actualiza los datos del empleado cuando se da de alta o baja
  actualizarEmpleado() {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const año = fechaActual.getFullYear();
    const fechaFormateada = `${año}-${mes}-${dia}`;
    let dataActualizacion = {};
    if (this.switchValue === true) {
      dataActualizacion ={
        fecha_baja:fechaFormateada,
        baja: 1,
        id: this.empleado.id
    }
  }else{
    dataActualizacion={
      fecha_reingreso:fechaFormateada,
      baja: 0,
      id: this.empleado.id
  }
    }
    this.empleadoServise
      .actualizarEmpleado(dataActualizacion)
      .subscribe({
        next: (empleado: HttpClientServiceInterfaceNoPayload) => {
          this.empActualizados.emit(true);
        },
        error: (error) => console.log(error),
      });
  }


  //este metodo envia el string para ambio de pantalla a documentos y el objeto del empleado
  verDocumentos(pantalla:string){
    const dataDocumentos={
      pantalla:pantalla,empleado:this.empleado
    }
    this.docEmpleado.emit(dataDocumentos);
  }

  
}
