import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize, take } from 'rxjs';
import {
  Categoria,
  EliminarCategoria,
} from 'src/app/web/informacion/interface/categorias';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import {
  Producto,
  ProductoVenta,
} from 'src/app/web/informacion/interface/productos';
import { ColumnaTabla } from 'src/app/web/informacion/interface/tabla';
import { CategoriasVentasService } from 'src/app/web/informacion/servicios/categorias-ventas/categorias-ventas.service';
import { StockVentasService } from 'src/app/web/informacion/servicios/stock-ventas/stock-ventas.service';
import {
  selectCategoriasVentasStore,
  selectProductosCompraVentaStore,
  selectStockVentasStore,
} from 'src/app/web/informacion/state';
import { guardarCategoriasVentas } from 'src/app/web/informacion/state/categoriasVentas/categoriasVentas.actions';
import { guardarProductosCompraVenta } from 'src/app/web/informacion/state/productosCompraVenta/productosCompraVenta.actions';
import { guardarProductosVentas } from 'src/app/web/informacion/state/stockVentas/stockVentas.actions';

@Component({
  selector: 'app-stock-ventas',
  templateUrl: './catalogo-productos.component.html',
  styleUrls: ['./catalogo-productos.component.scss'],
})
export class CatalogoProductosComponent implements OnInit {
  /**
   * @variable secciones: Contiene las secciones de la página
   */
  secciones = [{ texto: 'Cátalogo de productos', seleccionado: true }];

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
   * @variable productosCompraVenta: Productos del stock de compra con la categoria venta
   *           se pueden poner en el stock de venta
   */
  productosCompraVenta: Array<Producto> = [];

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
    this.consultarProductosCompraVenta();
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
  clickGuardarProducto(producto: ProductoVenta): void {
    this.mostrarAgregarProducto = false;
    this.stockVentasService
      .guardarProductoVentas(producto)
      .pipe(finalize(() => this.consultarProductos()))
      .subscribe({
        next: (
          respuestaGuardar: HttpClientServiceInterface<ProductoVenta[]>
        ) => {
          this.datosTabla = respuestaGuardar.payload;
          this.store.dispatch(
            guardarProductosVentas({
              productos: respuestaGuardar.payload,
            })
          );
          this.message.success(`Se guardo correctamente el producto.`);
        },
      });
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
  clickGuardarCategoria(categoria: any): void {
    this.mostrarAgregarCategoria = false;
    this.categoriasVentasService
      .crearCategorias(categoria)
      .pipe(
        finalize(() => {
          this.consultarCategorias();
          this.consultarProductos();
        })
      )
      .subscribe({
        next: (respuestaCrear: HttpClientServiceInterface<Categoria[]>) => {
          this.store.dispatch(
            guardarCategoriasVentas({
              categorias: respuestaCrear.payload,
            })
          );
          this.message.success(`Se guardo correctamente la categoría.`);
        },
        error: (error) => console.log(error),
      });
  }

  /**
   * @Metodo Captura el evento cuando se agrega una categoría
   */
  clickEliminarCategoria(idCategoria: number): void {
    this.mostrarAgregarCategoria = false;
    this.categoriasVentasService
      .eliminarCategoria(idCategoria)
      .pipe(
        finalize(() => {
          this.consultarCategorias();
          this.consultarProductos();
        })
      )
      .subscribe({
        next: (
          respuestaEliminar: HttpClientServiceInterface<EliminarCategoria>
        ) => {
          this.store.dispatch(
            guardarProductosVentas({
              productos: respuestaEliminar.payload.productos,
            })
          );
          this.store.dispatch(
            guardarCategoriasVentas({
              categorias: respuestaEliminar.payload.categoria,
            })
          );
          this.message.success(`Se elimino correctamente la categoría.`);
        },
        error: (error) => console.log(error),
      });
  }

  /**
   * @Metodo captura el evento de actualizar un producto y consulta todos los productos
   */
  actualizacionProducto(producto: ProductoVenta): void {
    this.mostrarCardProducto = false;
    this.stockVentasService.actualizarProductoVentas(producto).subscribe({
      next: (
        respuestaActualizar: HttpClientServiceInterface<ProductoVenta[]>
      ) => {
        this.store.dispatch(
          guardarProductosVentas({ productos: respuestaActualizar.payload })
        );
        this.consultarProductos();
        this.message.success(`Se actualizo correctamente el producto.`);
      },
      error: (error) => console.log(error),
    });
  }

  /**
   * @Metodo captura el evento de actualizar un producto y consulta todos los productos
   */
  eliminarProducto(idProducto: number): void {
    this.mostrarCardProducto = false;
    this.stockVentasService.eliminarProductoVentas(idProducto).subscribe({
      next: (
        respuestaEliminar: HttpClientServiceInterface<ProductoVenta[]>
      ) => {
        this.store.dispatch(
          guardarProductosVentas({ productos: respuestaEliminar.payload })
        );
        this.consultarProductos();
        this.message.success(`Se elimino correctamente el producto.`);
      },
      error: (error) => console.log(error),
    });
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
        if (categoriasStore?.length < 1) {
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
            error: (error) => console.log(error),
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

  /**
   * @Metodo guarda un nuevo producto
   */
  private consultarProductosCompraVenta(): void {
    this.store
      .select(selectProductosCompraVentaStore)
      .pipe(take(1))
      .subscribe((productosVentaStore: Producto[]) => {
        if (productosVentaStore.length < 1) {
          this.stockVentasService.consultarProductosVenta().subscribe({
            next: (
              respuestaConsulta: HttpClientServiceInterface<Producto[]>
            ) => {
              this.productosCompraVenta = respuestaConsulta.payload;
              this.store.dispatch(
                guardarProductosCompraVenta({
                  productos: respuestaConsulta.payload,
                })
              );
            },
            error: (error) => console.log(error),
          });
        } else {
          this.productosCompraVenta = productosVentaStore;
        }
      });
  }
}
