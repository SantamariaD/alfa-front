import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CatalogoProveedor } from 'src/app/web/informacion/interface/catalogo-proveedores';
import { HttpClientServiceInterfaceNoPayload } from 'src/app/web/informacion/interface/httpService';
import { CatalogoProveedoresService } from 'src/app/web/informacion/servicios/catalogo-proveedores/catalogo-proveedores.service';

@Component({
  selector: 'app-card-editar',
  templateUrl: './card-editar.component.html',
  styleUrls: ['./card-editar.component.scss'],
})
export class CardEditarComponent implements OnInit {
  /**
   * @Input productos: Contine el producto a editar
   */
  @Input() productoEditar: CatalogoProveedor = {} as CatalogoProveedor;

  /**
   * @Input mostrarCardEditar: Controla si se muestra o no la card
   */
  @Input() mostrarCardEditar = false;

  /**
   * @Output clickCerrar: manda el evento al dar click sobre el icono X
   */
  @Output() clickCerrar = new EventEmitter<any>();

  /**
   * @Output clickActualizar: manda el evento al dar click en actualizar
   */
  @Output() clickActualizar = new EventEmitter<any>();

  /**
   * @Formulario editarForm: fomulario para editar el producto
   */
  editarForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    proveedor: new FormControl({ value: '', disabled: true }),
    producto: new FormControl({ value: '', disabled: true }),
    politicasVenta: new FormControl(''),
    precioCompra: new FormControl(''),
    precioMaximoVenta: new FormControl(''),
  });

  constructor(private catalogoProveedoresService: CatalogoProveedoresService) {}

  ngOnInit(): void {
    this.editarForm.patchValue({
      id: this.productoEditar.id,
      proveedor: this.productoEditar.nombreProveedor,
      producto: this.productoEditar.nombreProducto,
      politicasVenta: this.productoEditar.politicasVenta,
      precioCompra: this.productoEditar.precioCompra,
      precioMaximoVenta: this.productoEditar.precioMaximoVenta,
    });
  }

  /**
   * @Metodo cerrar modal
   */
  clickCerrarModal(): void {
    this.clickCerrar.emit(false);
  }

  /**
   * @Metodo Llama al servicio para editar el producto del catálogo
   */
  editarProducto(): void {
    this.catalogoProveedoresService
      .actualizarProductoCatalogo(this.editarForm.value)
      .subscribe({
        next: (respuestaActualizar: HttpClientServiceInterfaceNoPayload) =>
          this.clickActualizar.emit(false),
      });
  }
}
