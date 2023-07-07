import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria } from 'src/app/web/informacion/interface/categorias';
import { ProductoVenta } from 'src/app/web/informacion/interface/productos';

@Component({
  selector: 'app-card-producto-venta',
  templateUrl: './card-producto.component.html',
  styleUrls: ['./card-producto.component.scss']
})
export class CardProductoComponent implements OnInit {
  /**
   * @Input producto: Información del producto mostrado en la card
   */
  @Input() producto: ProductoVenta = {} as ProductoVenta;

  /**
   * @Input categorias: contiene las categorias
   */
  @Input() categorias: Array<Categoria> = [];

  /**
   * @Input mostrarCardProducto: Controla si se muestra o no la card
   */
  @Input() mostrarCardProducto = false;

  /**
   * @Output clickCerrar: manda el evento al dar click sobre el icono X
   */
  @Output() clickCerrar = new EventEmitter<any>();

  /**
   * @Output actualizarProducto: emite el evento de actualizar producto
   */
  @Output() actualizarProductoEmit = new EventEmitter<any>();

  /**
   * @Output eliminarProducto: emite el evento de eliminar producto
   */
  @Output() eliminarProductoEmit = new EventEmitter<any>();

  /**
   * @Variable seccionModal: Controla la sección que se muestra en el modal
   */
  seccionModal = 'informacion';


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
    this.seccionModal = 'informacion';
  }

  /**
   * @Metodo captura el evento de actualizar un producto y consulta todos los productos
   */
  actualizacionProducto(productos: ProductoVenta): void {
    this.actualizarProductoEmit.emit(productos);
    this.seccionModal = 'informacion';
  }

  /**
   * @Metodo captura el evento de eliminar un producto y consulta todos los productos
   */
  eliminarProducto(idProducto: number): void {
    this.eliminarProductoEmit.emit(idProducto);
    this.seccionModal = 'informacion';
  }

}
