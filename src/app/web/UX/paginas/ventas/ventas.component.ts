import { Component, OnInit, ViewChild } from '@angular/core';
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
import { TicketComponent } from './componentes/ticket/ticket.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  @ViewChild('ticketComponent') ticketComponent: TicketComponent | undefined;

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
   * @variable tickets: Contiene los tickets que se se estan manejando
   */
  tickets: Ticket[] = [{} as Ticket];

  /**
   * @variable posicionTicket: Es el ticket que se trabaja actualmente
   */
  posicionTicket = 0;

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
    console.log(this.tickets);
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

        if (!this.tickets[this.posicionTicket].productosVenta) {
          this.tickets[this.posicionTicket].productosVenta = [
            {
              ...productoSeleccionado,
              cantidad: 1,
              total: productoSeleccionado.precioVenta,
            },
          ];
        } else {
          const productoExistente = this.tickets[
            this.posicionTicket
          ].productosVenta.find(
            (productoTicket: ProductoTicket) =>
              productoTicket.codigoBarras == codigoBarras
          );

          if (productoExistente) {
            const indiceObjeto = this.tickets[
              this.posicionTicket
            ].productosVenta.findIndex(
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
              const objetoMover = this.tickets[
                this.posicionTicket
              ].productosVenta.splice(indiceObjeto, 1)[0];
              this.tickets[this.posicionTicket].productosVenta.unshift(
                objetoMover
              );
              this.ticketComponent?.calculoTicket();
            }
          } else {
            this.tickets[this.posicionTicket].productosVenta.unshift({
              ...productoSeleccionado,
              cantidad: 1,
              total: productoSeleccionado.precioVenta,
            });
            this.ticketComponent?.calculoTicket();
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
    if (!this.tickets[this.posicionTicket].productosVenta) {
      this.tickets[this.posicionTicket].productosVenta = [];
    }

    let productoExistente = this.tickets[
      this.posicionTicket
    ].productosVenta.find(
      (productoTicket: ProductoTicket) =>
        productoTicket.codigoBarras == productoSeleccionado.codigoBarras
    ) as ProductoTicket;

    if (!productoExistente) {
      this.tickets[this.posicionTicket].productosVenta.unshift({
        ...productoSeleccionado,
        cantidad: 1,
        total: productoSeleccionado.precioVenta,
      });
      this.ticketComponent?.calculoTicket();
    } else {
      const indiceObjeto = this.tickets[
        this.posicionTicket
      ].productosVenta.findIndex(
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
        const objetoMover = this.tickets[
          this.posicionTicket
        ].productosVenta.splice(indiceObjeto, 1)[0];
        this.tickets[this.posicionTicket].productosVenta.unshift(objetoMover);
        this.ticketComponent?.calculoTicket();
      }
    }
  }

  /**
   * @Metodo agrega un nuevo ticket
   */
  agregarTicket(): void {
    this.tickets.push({} as Ticket);
  }

/**
   * @Metodo cambia la posición del ticket para ver otro
   */
  cambiarPosicionTicket(posicion: number): void {
    this.posicionTicket = posicion;
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
