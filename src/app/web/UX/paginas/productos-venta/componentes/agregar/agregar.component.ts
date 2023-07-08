import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/web/informacion/interface/categorias';
import {
  Producto,
  ProductoVenta,
} from 'src/app/web/informacion/interface/productos';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
})
export class AgregarComponent implements OnInit {
  /**
   * @Input categorias: contiene las categorias
   */
  @Input() categorias: Array<Categoria> = [];

  /**
   * @Input productosCompraVenta: contiene las productosCompraVenta
   */
  @Input() productosCompraVenta: Array<Producto> = [];

  /**
   * @Input productosVenta: Datos que contiene la tabla
   */
  @Input() productosVenta: Array<ProductoVenta> = [];

  /**
   * @Output clickCerrar: manda el evento al dar click sobre el icono X
   */
  @Output() clickCerrar = new EventEmitter<any>();

  /**
   * @Output clickGuardarProducto: manda el evento al guardar producto
   */
  @Output() clickGuardarProducto = new EventEmitter<any>();

  /**
   * @variable switchValue
   */
  switchValue = false;

  /**
   * @variable habilitarBotn
   */
  habilitarBotn = false;

  /**
   * @Variable productoCompra: Permite guardar un produto que viene del stock de compras
   */
  productoCompra = false;

  /**
   * @Variable productoCompra: Permite guardar un produto que viene del stock de compras
   */
  productoSelect: Producto = {} as Producto;

  /**
   * @Formulario editarForm: fomulario para editar el producto
   */
  guardarForm: FormGroup = new FormGroup({
    nombreProducto: new FormControl('', [Validators.required]),
    idCategoria: new FormControl(0, [Validators.required]),
    cantidadStock: new FormControl('', [Validators.required]),
    precioVenta: new FormControl('', [Validators.required]),
    codigoBarras: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    precioCompra: new FormControl('', [Validators.required]),
    descuento: new FormControl('', [Validators.required]),
    sku: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {
    this.productosCompraVenta = this.productosCompraVenta.filter(
      (producto: Producto) => {
        return !this.productosVenta.some(
          (venta: ProductoVenta) =>
            venta.sku == producto.sku && venta.stockCompras
        );
      }
    );
    console.log(this.productosCompraVenta)
  }

  /**
   * @Metodo cierra el modal
   */
  cerrarModal(): void {
    this.clickCerrar.emit(false);
  }

  /**
   * @Metodo guarda un nuevo producto
   */
  guardarProducto(): void {
    if (this.productoCompra) {
      const productoEnviar = {
        nombreProducto: this.productoSelect.nombre,
        cantidadStock: this.productoSelect.cantidadStock,
        codigoBarras: this.productoSelect.codigoBarras,
        descripcion: this.productoSelect.descripcion,
        sku: this.productoSelect.sku,
        idCategoria: parseInt(this.guardarForm.value.idCategoria),
        precioVenta: this.guardarForm.value.precioVenta,
        stockCompras: true,
      };
      this.habilitarBotn = false;
      this.clickGuardarProducto.emit(productoEnviar);
      this.guardarForm.reset();
    } else {
      this.clickGuardarProducto.emit(this.guardarForm.value);
      this.guardarForm.reset();
    }
  }

  /**
   * @Metodo Cambio del switch
   */
  switch(valor: any): void {
    this.productoCompra = valor;
  }

  /**
   * @Metodo Captura el evento del input de precio de venta
   */
  cambioPrecioVena(precio: any): void {
    if (this.productoCompra) {
      console.log(precio);
      this.habilitarBotn = true;
    }
  }

  /**
   * @Metodo se ejecuta cuando cambia el select de nombreProductoCompra
   */
  selectNombreProductoCompraVenta(valor: any): void {
    const producto = this.productosCompraVenta.filter(
      (producto: Producto) => producto.id == valor.target.value
    )[0];

    this.productoSelect = producto;
    this.guardarForm.patchValue({
      cantidadStock: producto.cantidadStock,
      sku: producto.sku,
      codigoBarras: producto.codigoBarras,
      descripcion: producto.descripcion,
      idCategoria: 1,
    });

    this.guardarForm.get('cantidadStock')?.disable();
    this.guardarForm.get('sku')?.disable();
    this.guardarForm.get('codigoBarras')?.disable();
    this.guardarForm.get('descripcion')?.disable();

    console.log(this.productoSelect);
  }
}
