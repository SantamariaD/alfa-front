import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Categoria } from 'src/app/web/informacion/interface/categorias';
import {
  HttpClientServiceInterface,
  HttpClientServiceInterfaceNoPayload,
} from 'src/app/web/informacion/interface/httpService';
import { Producto } from 'src/app/web/informacion/interface/productos';
import { CategoriasService } from 'src/app/web/informacion/servicios/categorias/categorias.service';
import { ProductosService } from 'src/app/web/informacion/servicios/productos/productos.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  /**
   * @Input producto: Información del producto mostrado en la card
   */
  @Input() producto: Producto = {} as Producto;

  /**
   * @Input categorias: contiene las categorias
   */
  @Input() categorias: Array<Categoria> = [];

  /**
   * @Output actualizarProducto: emite el evento de actualizar producto
   */
  @Output() actualizarProductoEmit = new EventEmitter<any>();

  /**
   * @Formulario editarForm: fomulario para editar el producto
   */
  editarForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    categoria: new FormControl(0),
    agotado: new FormControl(''),
    cantidadStock: new FormControl(''),
    codigoBarras: new FormControl(''),
    descripcion: new FormControl(''),
    precioVenta: new FormControl(''),
    proveedor: new FormControl(''),
    sku: new FormControl(''),
    comprasTotales: new FormControl(''),
  });

  /**
   * @Variable mostrarNotificacion: muestra la notificación de actualización
   */
  mostrarNotificacion = false;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.editarForm.patchValue({
      id: this.producto.id,
      nombre: this.producto.nombre,
      categoria: this.producto.idCategoria,
      cantidadStock: this.producto.cantidadStock,
      codigoBarras: this.producto.codigoBarras,
      descripcion: this.producto.descripcion,
      sku: this.producto.sku,
      agotado: this.producto.agotado,
      comprasTotales: this.producto.comprasTotales,
    });
  }

  /**
   * @Metodo Actualiza la información del producto
   */
  actualizarProducto(): void {
    this.editarForm.value.categoria = parseInt(this.editarForm.value.categoria);
    this.editarForm.value.precioVenta = parseFloat(
      this.editarForm.value.precioVenta.replace('$', '').replace(',', '')
    );
    this.productosService.actualizarProducto(this.editarForm.value).subscribe({
      next: (respuestaProductos: HttpClientServiceInterface<Producto[]>) => {
        this.mostrarNotificacion = true;
        this.actualizarProductoEmit.emit(respuestaProductos.payload);
        setTimeout(() => (this.mostrarNotificacion = false), 5000);
      },
    });
  }
}
