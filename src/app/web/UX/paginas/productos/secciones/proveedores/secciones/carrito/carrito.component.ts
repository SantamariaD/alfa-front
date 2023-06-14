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

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectCarritoCompra)
      .pipe(take(1))
      .subscribe(
        (carrito: Array<CatalogoProveedor>) => (this.carrito = carrito)
      );
  }
}
