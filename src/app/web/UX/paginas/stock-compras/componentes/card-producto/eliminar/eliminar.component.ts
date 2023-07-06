import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { Producto } from 'src/app/web/informacion/interface/productos';
import { ProductosService } from 'src/app/web/informacion/servicios/productos/productos.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss'],
})
export class EliminarComponent implements OnInit {
  /**
   * @Input producto: Información del producto mostrado en la card
   */
  @Input() producto: Producto = {} as Producto;

  /**
   * @Output actualizarProducto: emite el evento de actualizar producto
   */
  @Output() eliminarProductoEmit = new EventEmitter<any>();

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {}

  /**
   * @Metodo elimina el producto
   */
  clickEliminar(): void {
    this.productosService.eliminarProducto(this.producto.id).subscribe({
      next: (respuestaEliminar: HttpClientServiceInterface<Producto[]>) => {
        this.productosService.consultarProductosCompraVenta();
        this.eliminarProductoEmit.emit(respuestaEliminar.payload);
      },
    });
  }
}
