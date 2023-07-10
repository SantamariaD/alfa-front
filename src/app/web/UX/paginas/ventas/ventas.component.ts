import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize, take } from 'rxjs';
import { Categoria } from 'src/app/web/informacion/interface/categorias';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import {
  ProductoTicket,
  ProductoVenta,
} from 'src/app/web/informacion/interface/productos';
import { Ticket } from 'src/app/web/informacion/interface/ticket';
import { CategoriasVentasService } from 'src/app/web/informacion/servicios/categorias-ventas/categorias-ventas.service';
import { StockVentasService } from 'src/app/web/informacion/servicios/stock-ventas/stock-ventas.service';
import {
  selectCategoriasVentasStore,
  selectStockVentasStore,
} from 'src/app/web/informacion/state';
import { guardarCategoriasVentas } from 'src/app/web/informacion/state/categoriasVentas/categoriasVentas.actions';
import { guardarProductosVentas } from 'src/app/web/informacion/state/stockVentas/stockVentas.actions';
import { formateoMoneda } from 'src/app/web/informacion/utils/funciones';
import { IVA } from 'src/app/web/informacion/utils/variables-globales';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  /**
   * @variable codigoBarras: Contiene el codigoBarrase a buscar
   */
  codigoBarras = '';

  /**
   * @variable tipoBusqueda: selecciona el tipo de busqueda nombre o codigo de barras
   */
  tipoBusqueda = 'Código de barras';

  /**
   * @variable mostrarAgregarProducto: Muestra el modal de agregar producto
   */
  mostrarAgregarProducto = false;

  /**
   * @variable productosVenta: info de los productos
   */
  productosVenta: ProductoVenta[] = [];

  /**
   * @variable productosVentaFiltrados: info de los productos filtrados para busqueda
   */
  productosVentaFiltrados: ProductoVenta[] = [];

  /**
   * @variable ticket: info de los productos que estan en el ticket
   */
  ticket: Ticket = {} as Ticket;

  /**
   * @variable ticket: total del ticket
   */
  totalTicket: any;

   /**
   * @variable ticket: total de productos del ticket
   */
   totalProductos = 0;

  /**
   * @variable subtotalTicket: subtotal del ticket
   */
  subtotalTicket: any;

  /**
   * @variable iva: iva del ticket
   */
  iva = IVA;

  /**
   * @variable fecha: fecha del ticket
   */
  fecha = new Date();

  /**
   * @variable categorias: contiene las categorias
   */
  categorias: Array<Categoria> = [];

  /**
   * @variable codigoBarrasForm: formulario del codigoBarrase a buscar
   */
  codigoBarrasForm: FormControl = new FormControl('', [Validators.required]);

  constructor(
    private message: NzMessageService,
    private categoriasVentasService: CategoriasVentasService,
    private store: Store,
    private stockVentasService: StockVentasService
  ) {}

  ngOnInit(): void {
    this.consultarCategorias();
    this.consultarProductos();
    setInterval(() => {
      this.fecha = new Date();
    }, 1000);
  }

  /**
   * @Metodo Busca un producto por su codigo de barras por el lector o al dar enter
   */
  buscarCodigoBarras(codigo: any): void {
    if (codigo.key == 'Enter') {
      const codigoBarras = codigo.target.value;
      const productoSeleccionado = this.productosVenta.filter(
        (producto: ProductoVenta) => producto.codigoBarras == codigoBarras
      )[0];

      if (productoSeleccionado) {
        this.productosVentaFiltrados = [productoSeleccionado];
        this.codigoBarrasForm.reset();

        if (!this.ticket.productosVenta) {
          this.ticket.productosVenta = [
            {
              ...productoSeleccionado,
              cantidad: 1,
              total: productoSeleccionado.precioVenta,
            },
          ];
        } else {
          const productoExistente = this.ticket.productosVenta.find(
            (productoTicket: ProductoTicket) =>
              productoTicket.codigoBarras == codigoBarras
          );

          if (productoExistente) {
            const indiceObjeto = this.ticket.productosVenta.findIndex(
              (objeto) => objeto.codigoBarras == productoExistente.codigoBarras
            );
            productoExistente.cantidad += 1;
            productoExistente.total = formateoMoneda(
              productoExistente.cantidad *
                parseFloat(
                  productoExistente.precioVenta
                    .replace('$', '')
                    .replace(',', '')
                )
            );
            if (indiceObjeto !== -1) {
              const objetoMover = this.ticket.productosVenta.splice(
                indiceObjeto,
                1
              )[0];
              this.ticket.productosVenta.unshift(objetoMover);
              this.calculoTicket();
            }
          } else {
            this.ticket.productosVenta.unshift({
              ...productoSeleccionado,
              cantidad: 1,
              total: productoSeleccionado.precioVenta,
            });
            this.calculoTicket();
          }
        }
      } else {
        this.message.error(`No se encontró el producto.`);
        this.productosVentaFiltrados = this.productosVenta;
      }
    }
  }

  /**
   * @Metodo click en card para agregar un producto
   */
  clickAgregarProducto(productoSeleccionado: ProductoVenta): void {
    if (!this.ticket.productosVenta) {
      this.ticket.productosVenta = [];
    }

    let productoExistente = this.ticket.productosVenta.find(
      (productoTicket: ProductoTicket) =>
        productoTicket.codigoBarras == productoSeleccionado.codigoBarras
    ) as ProductoTicket;

    if (!productoExistente) {
      this.ticket.productosVenta.unshift({
        ...productoSeleccionado,
        cantidad: 1,
        total: productoSeleccionado.precioVenta,
      });
      this.calculoTicket();
    } else {
      const indiceObjeto = this.ticket.productosVenta.findIndex(
        (objeto) => objeto.codigoBarras == productoExistente.codigoBarras
      );
      productoExistente.cantidad += 1;
      productoExistente.total = formateoMoneda(
        productoExistente.cantidad *
          parseFloat(
            productoExistente.precioVenta.replace('$', '').replace(',', '')
          )
      );
      if (indiceObjeto !== -1) {
        const objetoMover = this.ticket.productosVenta.splice(
          indiceObjeto,
          1
        )[0];
        this.ticket.productosVenta.unshift(objetoMover);
        this.calculoTicket();
      }
    }
  }

  /**
   * @Metodo Busca un producto por su codigo de barras por el lector o al dar enter
   */
  buscarNombreProducto(nombre: any): void {
    if (nombre.key == 'Enter') {
      this.productosVentaFiltrados = this.productosVenta.filter(
        (producto: ProductoVenta) =>
          producto.nombreProducto.includes(nombre.target.value)
      );

      if (this.productosVentaFiltrados.length == 0) {
        this.message.error(`No se encontró el producto.`);
        this.productosVentaFiltrados = this.productosVenta;
      }
    }
  }

  /**
   * @Metodo Busca un producto por su codigo de barras de forma manual
   */
  buscarCodigoBarrasManual(): void {
    if (this.tipoBusqueda == 'Código de barras') {
      this.productosVentaFiltrados = this.productosVenta.filter(
        (producto: ProductoVenta) =>
          producto.codigoBarras == this.codigoBarrasForm.value
      );
    } else if (this.tipoBusqueda == 'Nombre del producto') {
      this.productosVentaFiltrados = this.productosVenta.filter(
        (producto: ProductoVenta) =>
          producto.nombreProducto.includes(this.codigoBarrasForm.value)
      );
    }

    if (this.productosVentaFiltrados.length < 1) {
      this.message.error(`No se encontro el producto.`);
      this.productosVentaFiltrados = this.productosVenta;
    }
  }

  /**
   * @Metodo selecciona busqueda con codigo de barras
   */
  selectCodigoBarras(): void {
    this.tipoBusqueda = 'Código de barras';
    this.codigoBarrasForm.reset();
  }

  /**
   * @Metodo selecciona busqueda con nombre del producto
   */
  selectNombreProducto(): void {
    this.tipoBusqueda = 'Nombre del producto';
    this.codigoBarrasForm.reset();
  }

  /**
   * @Metodo Formatea el array para mostrar todos los productos
   */
  verTodosProductos(): void {
    this.productosVentaFiltrados = this.productosVenta;
  }

  /**
   * @Metodo Captura el evento cuando se agrega un producto
   */
  clickGuardarProducto(producto: ProductoVenta): void {
    this.mostrarAgregarProducto = false;
    this.stockVentasService
      .guardarProductoVentas(producto)
      .pipe(finalize(() => this.ponerMoneda()))
      .subscribe({
        next: (
          respuestaGuardar: HttpClientServiceInterface<ProductoVenta[]>
        ) => {
          this.productosVenta = respuestaGuardar.payload;
          this.productosVentaFiltrados = respuestaGuardar.payload;
          this.store.dispatch(
            guardarProductosVentas({
              productos: respuestaGuardar.payload,
            })
          );
          this.message.success(`Se guardo correctamente el producto.`);
          this.consultarProductos();
        },
      });
  }

  /**
   * @Metodo Captura el evento cuando se da click en cerrar en modal
   */
  clickCerrarModalAgregarProducto(): void {
    this.mostrarAgregarProducto = false;
  }

  /**
   * @Metodo Captura el evento cuando se da click en abrir en modal
   */
  abrirModalAgregarProducto(): void {
    this.mostrarAgregarProducto = true;
  }

  /**
   * @Metodo Suma un producto
   */
  sumar(producto: any): void {}

  /**
   * @Metodo Resta un producto
   */
  restar(producto: any): void {}

  /**
   * @Metodo quita los simbolos y parse a un numero
   */
  private ponerMoneda(): void {
    this.productosVenta.map((producto: ProductoVenta) => {
      producto.precioCompra = formateoMoneda(parseFloat(producto.precioCompra));
      producto.precioVenta = formateoMoneda(parseFloat(producto.precioVenta));
      return producto;
    });
  }

  /**
   * @Metodo Calcula el total y subtotal del ticket
   */
  private calculoTicket() {
    this.totalTicket = 0;
    this.totalProductos = 0;
    this.ticket.productosVenta.forEach((producto: ProductoTicket) => {
      this.totalTicket += parseFloat(
        producto.total.replace('$', '').replace(',', '')
      );
      this.totalProductos += producto.cantidad;
    });
    this.subtotalTicket = formateoMoneda(
      this.totalTicket - this.totalTicket * IVA
    );
    this.totalTicket = formateoMoneda(this.totalTicket);
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
    this.productosVenta = [];
    this.store
      .select(selectStockVentasStore)
      .pipe(take(1))
      .subscribe((productosStore: ProductoVenta[]) => {
        if (productosStore.length < 1) {
          this.stockVentasService
            .consultarStockVentas()
            .pipe(finalize(() => this.ponerMoneda()))
            .subscribe({
              next: (
                respuestaProductos: HttpClientServiceInterface<
                  Array<ProductoVenta>
                >
              ) => {
                this.productosVenta = respuestaProductos.payload;
                this.productosVentaFiltrados = respuestaProductos.payload;
                this.store.dispatch(
                  guardarProductosVentas({
                    productos: respuestaProductos.payload,
                  })
                );
              },
              error: (error) => console.log(error),
            });
        } else {
          this.productosVenta = productosStore;
          this.productosVentaFiltrados = productosStore;
        }
      });
  }
}
