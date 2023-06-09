import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize, take } from 'rxjs';
import {
  Categoria,
  EliminarCategoriaCompra,
} from 'src/app/web/informacion/interface/categorias';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { Producto } from 'src/app/web/informacion/interface/productos';
import { ColumnaTabla } from 'src/app/web/informacion/interface/tabla';
import { CategoriasService } from 'src/app/web/informacion/servicios/categorias/categorias.service';
import { ProductosService } from 'src/app/web/informacion/servicios/productos/productos.service';
import {
  selectCategoriasStore,
  selectProductosStore,
} from 'src/app/web/informacion/state';
import { guardarCategorias } from 'src/app/web/informacion/state/categorias/categorias.actions';
import { guardarProductos } from 'src/app/web/informacion/state/productos/productos.actions';
import { formateoMoneda } from 'src/app/web/informacion/utils/funciones';

@Component({
  selector: 'app-stock',
  templateUrl: './almacen-compras.component.html',
  styleUrls: ['./almacen-compras.component.scss'],
})
export class StockComponent implements OnInit {
  /**
   * @variable producto: información del producto
   */
  producto: Producto = {} as Producto;

  /**
   * @variable totalProductos: total de todos los productos del stock
   */
  totalProductos = 0;

  /**
   * @variable valorProductosVenta: Valor total de todos los productos vendidos del stock
   */
  valorProductosVenta = 0;

  /**
   * @variable secciones: Contiene las secciones de la página
   */
  secciones = [{ texto: 'Almacen de compras', seleccionado: true }];

  /**
   * @variable columnasTabla: Columnas que contiene la tabla
   */
  columnasTabla: Array<ColumnaTabla> = [
    { columna: 'Nombre', llave: 'nombre', busqueda: true },
    { columna: 'SKU', llave: 'sku', busqueda: true },
    { columna: 'Categoría', llave: 'categoria', busqueda: true },
    { columna: 'Cantidad en stock', llave: 'cantidadStock', busqueda: true },
  ];

  /**
   * @variable datosTabla: Datos que contiene la tabla
   */
  datosTabla: Array<Producto> = [];

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

  /**
   * @variable seccion: Contiene la seccione actual
   */
  seccion = 'Almacen de compras';

  constructor(
    private message: NzMessageService,
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.consultarProductos();
    this.consultarCategorias();
  }

  /**
   * @Metodo Captura el evento cuando se da click a la fila y muestra el producto
   */
  clickFila(producto: Producto): void {
    this.producto = producto;
    this.mostrarCardProducto = true;
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
  clickGuardarProducto(producto: Producto): void {
    this.mostrarAgregarProducto = false;
    this.productosService
      .guardarProducto(producto)
      .pipe(
        finalize(() => {
          this.message.success(`Se guardo correctamente el producto.`);
          this.consultarProductos();
        })
      )
      .subscribe({
        next: (respuestaProductos: HttpClientServiceInterface<Producto[]>) => {
          this.datosTabla = respuestaProductos.payload;
          this.store.dispatch(
            guardarProductos({ productos: respuestaProductos.payload })
          );
        this.productosService.consultarProductosCompraVenta();
        },
      });
  }

  /**
   * @Metodo Captura el evento cuando se da click en cerrar en modal categoria
   */
  clickCerrarModalAgregarCategoria(cerrar: boolean): void {
    this.mostrarAgregarCategoria = cerrar;
  }

  /**
   * @Metodo Captura el evento cuando se agrega una categoría
   */
  clickGuardarCategoria(categoria: Categoria[]): void {
    this.mostrarAgregarCategoria = false;
    this.categoriasService
      .crearCategorias(categoria)
      .pipe(
        finalize(() => {
          this.consultarCategorias();
          this.consultarProductos();
          this.message.success(`Se guardo correctamente la categoría.`);
        })
      )
      .subscribe({
        next: (respuestaCrear: HttpClientServiceInterface<Categoria[]>) =>
          this.store.dispatch(
            guardarCategorias({ categorias: respuestaCrear.payload })
          ),
      });
  }

  /**
   * @Metodo Captura el evento cuando se agrega una categoría
   */
  clickEliminarCategoria(idCategoriaForm: number): void {
    this.mostrarAgregarCategoria = false;
    this.categoriasService
      .eliminarCategoria(idCategoriaForm)
      .pipe(
        finalize(() => {
          this.message.success(`Se elimino correctamente la categoría.`);
          this.consultarCategorias();
          this.consultarProductos();
        })
      )
      .subscribe({
        next: (respuestaEliminar: EliminarCategoriaCompra) => {
          this.store.dispatch(
            guardarCategorias({ categorias: respuestaEliminar.categoria })
          );
          this.store.dispatch(
            guardarProductos({ productos: respuestaEliminar.productos })
          );
        },
      });
  }

  /**
   * @Metodo captura el evento de actualizar un producto y consulta todos los productos
   */
  actualizacionProducto(productos: Producto[]): void {
    this.store.dispatch(guardarProductos({ productos: productos }));
    this.mostrarCardProducto = false;
    this.message.success(`Se actualizo correctamente el producto.`);
    this.consultarProductos();
  }

  /**
   * @Metodo captura el evento de actualizar un producto y consulta todos los productos
   */
  eliminarProducto(productos: Producto[]): void {
    this.store.dispatch(guardarProductos({ productos: productos }));
    this.mostrarCardProducto = false;
    this.message.success(`Se elimino correctamente el producto.`);
    this.consultarProductos();
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
      .select(selectCategoriasStore)
      .pipe(take(1))
      .subscribe((categoriasStore: Categoria[]) => {
        if (categoriasStore.length < 1) {
          this.categoriasService.traerCategorias().subscribe({
            next: (
              respuestaCategorias: HttpClientServiceInterface<Categoria[]>
            ) => {
              this.categorias = respuestaCategorias.payload;
              this.store.dispatch(
                guardarCategorias({ categorias: respuestaCategorias.payload })
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
      .select(selectProductosStore)
      .pipe(take(1))
      .subscribe((productosStore: Producto[]) => {
        if (productosStore?.length < 1) {
          this.productosService.consultarProductos().subscribe({
            next: (
              respuestaProductos: HttpClientServiceInterface<Array<Producto>>
            ) => {
              const productos = respuestaProductos.payload;
              this.datosTabla = respuestaProductos.payload;
              this.store.dispatch(guardarProductos({ productos }));
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
    this.datosTabla.map((producto: Producto) => {
      this.totalProductos += producto.cantidadStock;
      this.valorProductosVenta += producto.comprasTotales;
    });
  }
}
