import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { Producto } from '../../interface/productos';
import { ENDPOINTS } from '../../utils/endpoint';
import { HttpclientService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpclientService) {}

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
}
