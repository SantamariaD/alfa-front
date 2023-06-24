import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { pipe, take } from 'rxjs';
import { CatalogoProveedor } from 'src/app/web/informacion/interface/catalogo-proveedores';
import { selectCarritoCompra } from 'src/app/web/informacion/state';
import {
  actualizarProductoCarrito,
  eliminarProductoCarrito,
  guardarProductosCarrito,
} from 'src/app/web/informacion/state/carrito/carrito.actions';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  /**
   * @Varible carrito: contiene todos los productos del carrito
   */
  carrito: Array<CatalogoProveedor> = [];

  /**
   * @Varible cantidadProductos: cantidad de productos a comprar
   */
  cantidadProductos = 0;

  /**
   * @Varible cardOrdenCompra: muestra la card de orden de compra
   */
  cardOrdenCompra = false;

  /**
   * @Varible productosOrden: contiene la información de la orden de compra
   */
  productosOrden = {};

  /**
   * @Varible total: total a pagar
   */
  total = 0;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.carritoStore();
  }

  /**
   * @Metodo Suma un producto
   */
  sumar(producto: CatalogoProveedor): void {
    this.carrito.map((productoCarrito: CatalogoProveedor) => {
      if (productoCarrito.id === producto.id)
        productoCarrito.cantidadCompra += 1;
    });
    this.resumenCompra();
    this.store.dispatch(
      actualizarProductoCarrito({
        producto,
        cantidadCompra: producto.cantidadCompra,
      })
    );
  }

  /**
   * @Metodo Resta un producto
   */
  restar(producto: CatalogoProveedor): void {
    this.carrito.map((productoCarrito: CatalogoProveedor) => {
      if (productoCarrito.id === producto.id && producto.cantidadCompra > 1)
        productoCarrito.cantidadCompra -= 1;
    });
    this.resumenCompra();
    this.store.dispatch(
      actualizarProductoCarrito({
        producto,
        cantidadCompra: producto.cantidadCompra,
      })
    );
  }

  /**
   * @Metodo Cálculo de cantidad de productos y total a pagar
   */
  resumenCompra(): void {
    this.cantidadProductos = 0;
    this.total = 0;
    this.carrito.forEach((producto: CatalogoProveedor) => {
      this.cantidadProductos += producto.cantidadCompra;
      this.total += producto.cantidadCompra * producto.precioCompra;
    });
  }

  /**
   * @Metodo Elimina los productos al guardar una orden de compra
   */
  eliminarProductos(nombreProveedor: string): void {
    this.carrito = this.carrito.filter(
      (producto: CatalogoProveedor) =>
        producto.nombreProveedor !== nombreProveedor
    );
    this.store.dispatch(guardarProductosCarrito({ productos: this.carrito }));
  }

  /**
   * @Metodo Elimina un producto del carrito de compra
   */
  eliminarProducto(producto: CatalogoProveedor): void {
    this.store.dispatch(eliminarProductoCarrito({ producto }));
    this.carritoStore();
  }

  /**
   * @Metodo Realiza la compra y la generación de orden de compra
   */
  realizarCompra(): void {
    this.productosOrden = this.carrito.reduce(
      (objetoProveedores: any, proveedor) => {
        if (!objetoProveedores[proveedor.nombreProveedor]) {
          objetoProveedores[proveedor.nombreProveedor] = [];
        }

        objetoProveedores[proveedor.nombreProveedor].push(proveedor);

        return objetoProveedores;
      },
      {}
    );

    this.cardOrdenCompra = true;
  }

  /**
   * @Metodo Cierra la card de orden de compra
   */
  clickCerrar(): void {
    this.cardOrdenCompra = false;
  }

  /**
   * @Metodo Consulta el carrito del store
   */
  private carritoStore(): void {
    this.total = 0;
    this.cantidadProductos = 0;
    this.carrito = [];

    this.store
      .select(selectCarritoCompra)
      .pipe(take(1))
      .subscribe((carrito: Array<CatalogoProveedor>) => {
        carrito.map((producto: CatalogoProveedor) => {
          this.total += producto.precioCompra * producto.cantidadCompra;
        });
        this.carrito = carrito;
        this.cantidadProductos = this.carrito.length;
      });
  }
}
