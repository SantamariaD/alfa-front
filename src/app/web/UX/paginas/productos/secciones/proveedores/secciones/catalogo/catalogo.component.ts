import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CatalogoProveedor } from 'src/app/web/informacion/interface/catalogo-proveedores';
import {
  HttpClientServiceInterface,
  HttpClientServiceInterfaceNoPayload,
} from 'src/app/web/informacion/interface/httpService';
import { Producto } from 'src/app/web/informacion/interface/productos';
import {
  Proveedor,
  RespuestaProveedores,
} from 'src/app/web/informacion/interface/proveedores';
import { CatalogoProveedoresService } from 'src/app/web/informacion/servicios/catalogo-proveedores/catalogo-proveedores.service';
import { ProductosService } from 'src/app/web/informacion/servicios/productos/productos.service';
import { ProveedoresService } from 'src/app/web/informacion/servicios/proveedores/proveedores.service';
import { guardarProductoCarrito } from 'src/app/web/informacion/state/carrito/carrito.actions';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent implements OnInit {
  /**
   * @variable proveedores: Datos que contiene la tabla
   */
  proveedores: Array<Proveedor> = [];

  /**
   * @variable proveedor: Datos que contiene la tabla
   */
  proveedor: Proveedor = {} as Proveedor;

  /**
   * @variable catalogoProveedores: Datos que contiene la tabla
   */
  catalogoProveedores: Array<CatalogoProveedor> = [];

  /**
   * @variable productos: Contine todos los productos
   */
  productos: Array<Producto> = [];

  /**
   * @variable productos: Contine el producto a editar
   */
  productoEditar: CatalogoProveedor = {} as CatalogoProveedor;

  /**
   * @variable mostrarCollapse: Muestra los collapse cuando se busca un proveedor
   */
  mostrarCollapse = false;

  /**
   * @Form idProveedor: Id del proveedor que se buscara el catalógo
   */
  idProveedor = new FormControl('', [Validators.required]);

  /**
   * @Form clickCerrar: Cierra o abre el modal
   */
  clickCerrar = false;

  /**
   * @variable switchValue
   */
  switchValue = false;

  /**
   * @variable comprarProducto: Si se quiere o no hacer una comora
   */
  comprarProducto = false;

  /**
   * @variable botonCarrito: muestra u oculta el boton de agregar a carrito
   */
  botonCarrito = [''];

  /**
   * @Form catalogoForm: Id del proveedor que se buscara el catalógo
   */
  catalogoForm: FormGroup = new FormGroup({
    nombreProveedor: new FormControl({value: '', disabled: true}),
    idProveedor: new FormControl(null, [Validators.required]),
    idProducto: new FormControl(null, [Validators.required]),
    precioCompra: new FormControl('', [Validators.required]),
    precioMaximoVenta: new FormControl('', [Validators.required]),
    politicasVenta: new FormControl('', [Validators.required]),
  });

  constructor(
    private proveedoresService: ProveedoresService,
    private productosService: ProductosService,
    private catalogoProveedoresService: CatalogoProveedoresService,
    private modal: NzModalService,
    private message: NzMessageService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.consultarProveedores();
    this.consultarProductos();
  }

  /**
   * @Metodo busca el catalógo relacionado con el proveedor
   */
  buscarCatalogo(): void {
    this.mostrarCollapse = false;
    this.catalogoForm.patchValue({
      idProveedor: this.idProveedor.value,
    });
    this.proveedoresService
      .consultarProveedor(this.catalogoForm.value)
      .subscribe({
        next: (respuestaProveedores: HttpClientServiceInterface<Proveedor>) => {
          this.mostrarCollapse = true;
          this.proveedor = respuestaProveedores.payload;
        },
        error: (error) => console.log(error),
      });

    this.catalogoProveedoresService
      .consultarCatalogoProveedor(this.catalogoForm.value.idProveedor)
      .subscribe({
        next: (
          respuestaConsulta: HttpClientServiceInterface<CatalogoProveedor[]>
        ) => {
          this.catalogoForm.patchValue({
            nombreProveedor: respuestaConsulta.payload[0].nombreProveedor,
          });
          this.catalogoProveedores = respuestaConsulta.payload;
        },
      });
  }

  /**
   * @Metodo Guarda un producto en el catalogo del proveedor seleccionado
   */
  guardarProductoCatalogo(): void {
    this.catalogoForm.value.idProducto = parseInt(
      this.catalogoForm.value.idProducto
    );
    this.catalogoForm.value.idProveedor = parseInt(
      this.catalogoForm.value.idProveedor
    );

    this.catalogoProveedoresService
      .guardarProductoCatalogo(this.catalogoForm.value)
      .subscribe({
        next: (
          respuestaConsulta: HttpClientServiceInterface<CatalogoProveedor>
        ) => {
          this.message.success('Se guardo correctamente el producto');
          this.buscarCatalogo();

        },
      });
  }

  /**
   * @Meotod edita un producto del catálogo de proveedores
   */
  editar(catalogo: CatalogoProveedor): void {
    this.productoEditar = catalogo;
    this.clickCerrar = true;
  }

  /**
   * @Meotod click de la card al actualizar un producto del catálogo de proveedores
   */
  actualizarProducto(): void {
    this.clickCerrar = false;
    this.message.success('Se actualizó correctamente el producto');
    this.buscarCatalogo();
  }

  /**
   * @Meotod muestra el modal para eliminar un producto del catálogo de proveedores
   */
  eliminarModal(catalogo: CatalogoProveedor): void {
    this.modal.confirm({
      nzTitle: '<strong>Eliminar producto</strong>',
      nzContent:
        '¿Estás seguro de eliminar el producto del catálogo de proveedores?',
      nzOkText: 'Si',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.eliminar(catalogo),
      nzCancelText: 'No',
    });
  }

  /**
   * @Meotod muestra el modal para eliminar un producto del catálogo de proveedores
   */
  eliminar(catalogo: CatalogoProveedor): void {
    this.catalogoProveedoresService
      .eliminarProductoCatalogo(catalogo.id)
      .subscribe({
        next: (respuestaEliminar: HttpClientServiceInterfaceNoPayload) => {
          this.message.success('Se elimino correctamente el producto');
          this.buscarCatalogo();
        },
      });
  }

  /**
   * @Metodo cerrar modal
   */
  clickCerrarModal(): void {
    this.clickCerrar = false;
  }

  /**
   * @Metodo Cambio del switch
   */
  switch(valor: any): void {
    this.comprarProducto = valor;
  }

  /**
   * @Metodo Agrega producto al carrito
   */
  agregarCarrito(catalogo: CatalogoProveedor): void {
    this.store.dispatch(guardarProductoCarrito({producto: catalogo}));
    this.botonCarrito.push(catalogo.nombreProducto)
  }

  /**
   * @Metodo Consulta todos los productos
   */
  private consultarProductos(): void {
    this.productosService.consultarProductos().subscribe({
      next: (respuestaProductos: HttpClientServiceInterface<Array<Producto>>) =>
        (this.productos = respuestaProductos.payload),
      error: (error) => console.log(error),
    });
  }

  /**
   * @Metodo Consulta todos los proveedores
   */
  private consultarProveedores(): void {
    this.proveedoresService.consultarProveedores().subscribe({
      next: (
        respuestaProveedores: HttpClientServiceInterface<RespuestaProveedores>
      ) => (this.proveedores = respuestaProveedores.payload.proveedores),
      error: (error) => console.log(error),
    });
  }
}
