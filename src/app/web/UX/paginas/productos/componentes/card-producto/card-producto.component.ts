import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from 'src/app/web/informacion/interface/productos';

@Component({
  selector: 'app-card-producto',
  templateUrl: './card-producto.component.html',
  styleUrls: ['./card-producto.component.scss'],
})
export class CardProductoComponent implements OnInit {
  /**
   * @Input producto: Información del producto mostrado en la card
   */
  @Input() producto: Producto = {} as Producto;

  /**
   * @Input mostrarCardProducto: Controla si se muestra o no la card
   */
  @Input() mostrarCardProducto = false;

  /**
   * @Output clickCerrar: manda el evento al dar click sobre el icono X
   */
  @Output() clickCerrar = new EventEmitter<any>();

  /**
   * @Variable seccionModal: Controla la sección que se muestra en el modal
   */
  seccionModal = 'informacion'

  constructor() {}

  ngOnInit(): void {
    console.log(this.producto)}

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
   * @Metodo cerrar modal
   */
  clickCerrarModal(): void {
    this.clickCerrar.emit(false);
  }
}
