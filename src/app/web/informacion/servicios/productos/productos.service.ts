import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { Producto } from '../../interface/productos';
import { guardarProductosCompraVenta } from '../../state/productosCompraVenta/productosCompraVenta.actions';
import { ENDPOINTS } from '../../utils/endpoint';
import { HttpclientService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpclientService, private store: Store) {}

  /**
   * @Servicio consulta todos los productos de la base
   */
  consultarProductos(): Observable<
    HttpClientServiceInterface<Array<Producto>>
  > {
    return this.http.get<HttpClientServiceInterface<Array<Producto>>>(
      ENDPOINTS.productos.consultarProductos
    );
  }

  /**
   * @Servicio actualiza un producto
   */
  actualizarProducto(
    producto: any
  ): Observable<HttpClientServiceInterface<Producto[]>> {
    return this.http.put<HttpClientServiceInterface<Producto[]>>(
      ENDPOINTS.productos.actualizarProductos,
      producto
    );
  }

  /**
   * @Servicio elimina un producto
   */
  eliminarProducto(
    id: number
  ): Observable<HttpClientServiceInterface<Producto[]>> {
    return this.http.delete<HttpClientServiceInterface<Producto[]>>(
      ENDPOINTS.productos.eliminarProductos + '/' + id
    );
  }

  /**
   * @Servicio elimina un producto
   */
  guardarProducto(
    producto: any
  ): Observable<HttpClientServiceInterface<Producto[]>> {
    return this.http.post<HttpClientServiceInterface<Producto[]>>(
      ENDPOINTS.productos.guardarProductos,
      producto
    );
  }

  /**
   * @Metodo Actualiza los productos de compra y venta por si se llego a cambiar la categoría de un producto
   */
  consultarProductosCompraVenta(): void {
    this.http
      .get<HttpClientServiceInterface<Producto[]>>(
        ENDPOINTS.productos.consultarProductosVenta
      )
      .subscribe({
        next: (respuestaConsulta: HttpClientServiceInterface<Producto[]>) =>
          this.store.dispatch(
            guardarProductosCompraVenta({
              productos: respuestaConsulta.payload,
            })
          ),
        error: (error) => console.log(error),
      });
  }
}
