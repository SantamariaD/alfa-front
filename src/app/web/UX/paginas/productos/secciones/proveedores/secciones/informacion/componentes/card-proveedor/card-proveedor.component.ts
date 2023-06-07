import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Proveedor } from 'src/app/web/informacion/interface/proveedores';

@Component({
  selector: 'app-card-proveedor',
  templateUrl: './card-proveedor.component.html',
  styleUrls: ['./card-proveedor.component.scss']
})
export class CardProveedorComponent implements OnInit {
  /**
   * @Input mostrarCardProveedor: Controla si se muestra o no la card
   */
  @Input() mostrarCardProveedor = false;

  /**
   * @Input proveedor: Información del proveedor mostrado en la card
   */
  @Input() proveedor: Proveedor = {} as Proveedor;

  /**
   * @Output clickCerrar: manda el evento al dar click sobre el icono X
   */
  @Output() clickCerrar = new EventEmitter<any>();

  /**
   * @Output actualizarProveedor: emite el evento de actualizar proveedor
   */
  @Output() actualizarProveedorEmit = new EventEmitter<any>();

  /**
   * @Output eliminarProveedor: emite el evento de eliminar proveedor
   */
  @Output() eliminarProveedorEmit = new EventEmitter<any>();

  /**
   * @Variable seccionModal: Controla la sección que se muestra en el modal
   */
  seccionModal = 'informacion'

  constructor() { }

  ngOnInit(): void {
  }

   /**
   * @Metodo cambia a la seccion informacion
   */
   clickInformacion(): void {
    this.seccionModal = 'informacion';
  }

  /**
   * @Metodo cambia a la seccion agregar
   */
  clickAgregar(): void {
    this.seccionModal = 'agregar';
  }

  /**
   * @Metodo cambia a la seccion editar
   */
  clickEditar(): void {
    this.seccionModal = 'editar';
  }

  /**
   * @Metodo cambia a la seccion eliminar
   */
  clickEliminar(): void {
    this.seccionModal = 'eliminar';
  }


  /**
   * @Metodo cerrar modal
   */
  clickCerrarModal(): void {
    this.clickCerrar.emit(false);
  }

  /**
   * @Metodo captura el evento de actualizar un proveedor y consulta todos los proveedors
   */
  actualizacionProveedor(): void {
    this.actualizarProveedorEmit.emit(true);
  }

  /**
   * @Metodo captura el evento de eliminar un proveedor y consulta todos los proveedors
   */
  eliminarProveedor(): void {
    this.eliminarProveedorEmit.emit(true);
  }

}
