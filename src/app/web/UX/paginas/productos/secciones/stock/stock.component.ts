import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Categoria } from 'src/app/web/informacion/interface/categorias';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { Producto } from 'src/app/web/informacion/interface/productos';
import { ColumnaTabla } from 'src/app/web/informacion/interface/tabla';
import { CategoriasService } from 'src/app/web/informacion/servicios/categorias/categorias.service';
import { ProductosService } from 'src/app/web/informacion/servicios/productos/productos.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
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
   * @variable totalProductos: Valor total de todos los productos del stock
   */
  valorProductos = 0;

  /**
   * @variable columnasTabla: Columnas que contiene la tabla
   */
  columnasTabla: Array<ColumnaTabla> = [
    { columna: 'Nombre', llave: 'nombre', busqueda: true },
    {
      columna: 'Descripción',
      llave: 'descripcion',
      busqueda: true,
      class: 'limitar',
    },
    { columna: 'Código', llave: 'codigoBarras', busqueda: true },
    { columna: 'Categoría', llave: 'categoria', busqueda: true },
    { columna: 'Proveedor', llave: 'proveedor', busqueda: true },
    { columna: 'Precio de compra', llave: 'precioCompra', busqueda: true },
    { columna: 'Precio de venta', llave: 'precioVenta', busqueda: true },
    { columna: 'Cantidad en stock', llave: 'cantidadStock', busqueda: true },
    { columna: 'Fecha de compra', llave: 'fechaCompra', busqueda: true },
    { columna: 'Vendidos', llave: 'ventas', busqueda: true },
  ];

  /**
   * @variable datosTabla: Datos que contiene la tabla
   */
  datosTabla: Array<Producto> = [];

  /**
   * @variable datosTabla: Datos que contiene la tabla
   */
  mostrarCardProducto = false;

  /**
   * @variable categorias: contiene las categorias
   */
  categorias: Array<Categoria> = [];

  constructor(
    private message: NzMessageService,
    private productosService: ProductosService,
    private categoriasService: CategoriasService
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
   * @Metodo Captura el evento cuando se da click a la fila y muestra el producto
   */
  clickCerrarModal(cerrar: boolean): void {
    this.mostrarCardProducto = cerrar;
  }

  /**
   * @Metodo captura el evento de actualizar un producto y consulta todos los productos
   */
  actualizacionProducto(): void {
    this.consultarProductos();
  }

  /**
   * @Metodo captura el evento de actualizar un producto y consulta todos los productos
   */
  eliminarProducto(): void {
    this.mostrarCardProducto = false;
    this.consultarProductos();
    this.message.success(`Se elimino correctamente el producto.`);
  }

  /**
   * @Metodo llama a la api para consultar las categorias
   */
  private consultarCategorias(): void {
    this.categoriasService.traerCategorias().subscribe({
      next: (respuestaCategorias: HttpClientServiceInterface<Categoria[]>) =>
        (this.categorias = respuestaCategorias.payload),
    });
  }

  /**
   * @Metodo Consulta todos los productos
   */
  private consultarProductos(): void {
    this.productosService.consultarProductos().subscribe({
      next: (
        respuestaProductos: HttpClientServiceInterface<Array<Producto>>
      ) => {
        this.datosTabla = respuestaProductos.payload;
        this.informacionStock();
      },
      error: (error) => console.log(error),
    });
  }

  /**
   * @Metodo Realiza las operaciones para la información general del stock
   */
  private informacionStock(): void {
    this.datosTabla.map((producto: Producto) => {
      this.valorProductos += parseFloat(producto.precioCompra);
      this.totalProductos += parseInt(producto.cantidadStock);
    });
  }
}