import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductoVenta } from 'src/app/web/informacion/interface/productos';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss'],
})
export class EliminarComponent implements OnInit {
  /**
   * @Input producto: Información del producto mostrado en la card
   */
  @Input() producto: ProductoVenta = {} as ProductoVenta;

  /**
   * @Output actualizarProducto: emite el evento de actualizar producto
   */
  @Output() eliminarProductoEmit = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * @Metodo elimina el producto
   */
  clickEliminar(): void {
    this.eliminarProductoEmit.emit(this.producto.id);
  }
}
