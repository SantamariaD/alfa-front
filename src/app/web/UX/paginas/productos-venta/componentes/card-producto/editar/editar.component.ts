import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Categoria } from 'src/app/web/informacion/interface/categorias';
import { ProductoVenta } from 'src/app/web/informacion/interface/productos';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  /**
   * @Input producto: Información del producto mostrado en la card
   */
  @Input() producto: ProductoVenta = {} as ProductoVenta;

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
    nombreProducto: new FormControl(''),
    idCategoria: new FormControl(0),
    agotado: new FormControl(0),
    cantidadStock: new FormControl(''),
    codigoBarras: new FormControl(''),
    descripcion: new FormControl(''),
    precioVenta: new FormControl(''),
    precioCompra: new FormControl(''),
    descuento: new FormControl(''),
    proveedor: new FormControl(''),
    sku: new FormControl(''),
    ventasTotales: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {
    this.editarForm.patchValue({
      id: this.producto.id,
      nombreProducto: this.producto.nombreProducto,
      idCategoria: this.producto.idCategoria,
      cantidadStock: this.producto.cantidadStock,
      codigoBarras: this.producto.codigoBarras,
      descripcion: this.producto.descripcion,
      sku: this.producto.sku,
      agotado: this.producto.agotado,
      precioVenta: this.producto.precioVenta,
      ventasTotales: this.producto.ventasTotales,
      descuento: this.producto.descuento,
      precioCompra: this.producto.precioCompra,
    });
  }

  /**
   * @Metodo Emite el evento de actualizar producto
   */
  actualizarProducto(): void {
    if (
      this.editarForm.value.precioCompra.includes('$') &&
      this.editarForm.value.precioVenta.includes('$')
    ) {
      this.editarForm.value.precioCompra = parseFloat(
        this.editarForm.value.precioCompra?.replace('$', '').replace(',', '')
      );
      this.editarForm.value.precioVenta = parseFloat(
        this.editarForm.value.precioVenta?.replace('$', '')?.replace(',', '')
      );
    }
    this.actualizarProductoEmit.emit(this.editarForm.value);
  }
}
