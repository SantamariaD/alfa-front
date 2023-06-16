import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { CatalogoProveedor } from 'src/app/web/informacion/interface/catalogo-proveedores';
import { selectCarritoCompra } from 'src/app/web/informacion/state';

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
   * @Varible total: total a pagar
   */
  total = 0;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectCarritoCompra)
      .pipe(take(1))
      .subscribe((carrito: Array<CatalogoProveedor>) => {
        carrito.map((producto: CatalogoProveedor) => {
          this.total += producto.precioCompra;
          return (producto.cantidadCompra = 1);
        });
        this.carrito = carrito;
        this.cantidadProductos = this.carrito.length;
      });
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
}
