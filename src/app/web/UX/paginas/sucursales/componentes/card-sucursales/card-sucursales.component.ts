import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConsultaSucursales } from 'src/app/web/informacion/interface/sucursales';

@Component({
  selector: 'app-card-sucursales',
  templateUrl: './card-sucursales.component.html',
  styleUrls: ['./card-sucursales.component.scss'],
})
export class CardSucursalesComponent implements OnInit {
  /**
   * @Input sucursal: Información de la sucursal mostrado en la card
   */
  @Input() sucursal: ConsultaSucursales = {} as ConsultaSucursales;
  
  /**
   * @Output clickCerrar: manda el evento al dar click sobre el icono X
   */
  @Output() clickCerrar = new EventEmitter<any>();

  /**
   * @Output actualizarSucursalEmit: emite el evento de actualizar sucursal
   */
  @Output() actualizarSucursalEmit = new EventEmitter<any>();

  /**
   * @Output actualizarSucursalEmit: emite el evento de actualizar sucursal
   */
  @Output() eliminarSucursalEmit = new EventEmitter<any>();

  /**
   * @Variable seccionModal: Controla la sección que se muestra en el modal
   */
  seccionModal = 'informacion';

  constructor() {}

  ngOnInit(): void {}

  /**
   * @Metodo cerrar modal
   */
  clickCerrarModal(): void {
    this.clickCerrar.emit(false);
    this.seccionModal = 'informacion';
  }

   /**
   * @Metodo cambia a la seccion informacion
   */
   clickInformacion(): void {
    this.seccionModal = 'informacion';
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
   * @Metodo cambia a la seccion eliminar
   */
  actualizarSucursal(sucursal: any): void {
    this.actualizarSucursalEmit.emit(sucursal);
    this.clickCerrar.emit(false);
    this.seccionModal = 'informacion';
  }

  /**
   * @Metodo cambia a la seccion eliminar
   */
  eliminarSucursal(idSucursal: any): void {
    this.eliminarSucursalEmit.emit(idSucursal);
    this.clickCerrar.emit(false);
    this.seccionModal = 'informacion';
  }
}
