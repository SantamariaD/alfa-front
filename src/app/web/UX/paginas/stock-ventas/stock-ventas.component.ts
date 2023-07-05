import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { take } from 'rxjs';
import { Categoria } from 'src/app/web/informacion/interface/categorias';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { ProductoVenta } from 'src/app/web/informacion/interface/productos';
import { ColumnaTabla } from 'src/app/web/informacion/interface/tabla';
import { CategoriasVentasService } from 'src/app/web/informacion/servicios/categorias-ventas/categorias-ventas.service';
import { StockVentasService } from 'src/app/web/informacion/servicios/stock-ventas/stock-ventas.service';
import {
  selectCategoriasVentasStore,
  selectStockVentasStore,
} from 'src/app/web/informacion/state';
import { guardarCategoriasVentas } from 'src/app/web/informacion/state/categoriasVentas/categoriasVentas.actions';
import { guardarProductosVentas } from 'src/app/web/informacion/state/stockVentas/stockVentas.actions';

@Component({
  selector: 'app-stock-ventas',
  templateUrl: './stock-ventas.component.html',
  styleUrls: ['./stock-ventas.component.scss'],
})
export class StockVentasComponent implements OnInit {
  /**
   * @variable secciones: Contiene las secciones de la página
   */
  secciones = [{ texto: 'Stock de ventas', seleccionado: true }];

  /**
   * @variable columnasTabla: Columnas que contiene la tabla
   */
  columnasTabla: Array<ColumnaTabla> = [
    { columna: 'Nombre', llave: 'nombreProducto', busqueda: true },
    { columna: 'SKU', llave: 'sku', busqueda: true },
    { columna: 'Categoría', llave: 'categoria', busqueda: true },
    { columna: 'Cantidad en stock', llave: 'cantidadStock', busqueda: true },
  ];

  /**
   * @variable totalProductos: total de todos los productos del stock
   */
  totalProductos = 0;

  /**
   * @variable valorProductosVendidos: Valor total de todos los productos vendidos del stock
   */
  valorProductosVendidos = 0;

  /**
   * @variable seccion: Contiene la seccione actual
   */
  seccion = 'Stock de ventas';

  /**
   * @variable producto: información del producto de venta
   */
  producto: ProductoVenta = {} as ProductoVenta;

  /**
   * @variable datosTabla: Datos que contiene la tabla
   */
  datosTabla: Array<ProductoVenta> = [];

  /**
   * @variable mostrarCardProducto: Muestra la card del producto
   */
  mostrarCardProducto = false;

  /**
   * @variable mostrarAgregarProducto: Muestra el modal de agregar producto
   */
  mostrarAgregarProducto = false;

  /**
   * @variable mostrarAgregarCategoria: Muestra el modal de agregar categoria
   */
  mostrarAgregarCategoria = false;

  /**
   * @variable categorias: contiene las categorias
   */
  categorias: Array<Categoria> = [];

  constructor(
    private message: NzMessageService,
    private categoriasVentasService: CategoriasVentasService,
    private store: Store,
    private stockVentasService: StockVentasService
  ) {}

  ngOnInit(): void {
    this.consultarCategorias();
    this.consultarProductos();
  }

  /**
   * @Metodo Asigna la sección en la que nos encontramos
   */
  selectSeccion(seccion: string): void {
    this.seccion = seccion;
  }

  /**
   * @Metodo Captura el evento cuando se da click a la fila y muestra el producto
   */
  clickFila(producto: ProductoVenta): void {
    this.producto = producto;
    this.mostrarCardProducto = true;
  }

  /**
   * @Metodo Captura el evento cuando se da click a la fila y muestra el producto
   */
  clickCerrarModal(cerrar: boolean): void {
    this.mostrarCardProducto = cerrar;
  }

  /**
   * @Metodo Captura el evento cuando se da click en cerrar en modal
   */
  clickCerrarModalAgregarProducto(cerrar: boolean): void {
    this.mostrarAgregarProducto = cerrar;
  }

  /**
   * @Metodo Captura el evento cuando se agrega un producto
   */
  clickGuardarProducto(producto: ProductoVenta[]): void {
    this.datosTabla = producto;
    this.mostrarAgregarProducto = false;
    this.message.success(`Se guardo correctamente el producto.`);
    this.consultarProductos();
  }

  /**
   * @Metodo Captura el evento cuando se da click en cerrar en modal categoria
   */
  clickCerrarModalAgregarCategoria(): void {
    this.mostrarAgregarCategoria = false;
  }

  /**
   * @Metodo Captura el evento cuando se agrega una categoría
   */
  clickGuardarCategoria(): void {
    this.mostrarAgregarCategoria = false;
    this.message.success(`Se guardo correctamente la categoría.`);
    this.consultarCategorias();
    this.consultarProductos();
  }

  /**
   * @Metodo Captura el evento cuando se agrega una categoría
   */
  clickEliminarCategoria(): void {
    this.mostrarAgregarCategoria = false;
    this.message.success(`Se elimino correctamente la categoría.`);
    this.consultarCategorias();
    this.consultarProductos();
  }

  /**
   * @Metodo captura el evento de actualizar un producto y consulta todos los productos
   */
  actualizacionProducto(producto: ProductoVenta): void {
    this.mostrarCardProducto = false;
    this.message.success(`Se actualizo correctamente el producto.`);
    this.stockVentasService.actualizarProductoVentas(producto).subscribe({
      next: (
        respuestaActualizar: HttpClientServiceInterface<ProductoVenta[]>
      ) => {
        this.store.dispatch(
          guardarProductosVentas({ productos: respuestaActualizar.payload })
        );
        this.consultarProductos();
      },
      error: (error) => console.log(error),
    });
  }

  /**
   * @Metodo captura el evento de actualizar un producto y consulta todos los productos
   */
  eliminarProducto(idProducto: number[]): void {
    console.log(idProducto);
    this.mostrarCardProducto = false;
    this.message.success(`Se elimino correctamente el producto.`);
    //this.consultarProductos();
  }

  /**
   * @Metodo Muestra el modal para agregar un producto
   */
  agregarProducto(): void {
    this.mostrarAgregarProducto = true;
  }

  /**
   * @Metodo Muestra el modal para agregar un producto
   */
  agregarCategoria(): void {
    this.mostrarAgregarCategoria = true;
  }

  /**
   * @Metodo llama a la api para consultar las categorias
   */
  private consultarCategorias(): void {
    this.store
      .select(selectCategoriasVentasStore)
      .pipe(take(1))
      .subscribe((categoriasStore: Categoria[]) => {
        if (categoriasStore.length < 1) {
          this.categoriasVentasService.traerCategorias().subscribe({
            next: (
              respuestaCategorias: HttpClientServiceInterface<Categoria[]>
            ) => {
              this.categorias = respuestaCategorias.payload;
              this.store.dispatch(
                guardarCategoriasVentas({
                  categorias: respuestaCategorias.payload,
                })
              );
            },
          });
        } else {
          this.categorias = categoriasStore;
        }
      });
  }

  /**
   * @Metodo Consulta todos los productos
   */
  private consultarProductos(): void {
    this.datosTabla = [];
    this.store
      .select(selectStockVentasStore)
      .pipe(take(1))
      .subscribe((productosStore: ProductoVenta[]) => {
        console.log(productosStore);
        if (productosStore.length < 1) {
          this.stockVentasService.consultarStockVentas().subscribe({
            next: (
              respuestaProductos: HttpClientServiceInterface<
                Array<ProductoVenta>
              >
            ) => {
              const productos = respuestaProductos.payload;
              this.datosTabla = respuestaProductos.payload;
              this.store.dispatch(guardarProductosVentas({ productos }));
              this.informacionStock();
            },
            error: (error) => console.log(error),
          });
        } else {
          this.datosTabla = productosStore;
          this.informacionStock();
        }
      });
  }

  /**
   * @Metodo Realiza las operaciones para la información general del stock
   */
  private informacionStock(): void {
    this.totalProductos = 0;
    this.datosTabla.map((producto: ProductoVenta) => {
      this.totalProductos += producto.cantidadStock;
      this.valorProductosVendidos += producto.ventasTotales;
    });
  }
}
