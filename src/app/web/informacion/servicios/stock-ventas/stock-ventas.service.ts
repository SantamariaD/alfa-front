import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { Observable } from 'rxjs';
import { Producto, ProductoVenta } from '../../interface/productos';
import { ENDPOINTS } from '../../utils/endpoint';

@Injectable({
  providedIn: 'root',
})
export class StockVentasService {
  constructor(private http: HttpclientService) {}

  /**
   * @Servicio consulta todos los productos de la base
   */
  consultarStockVentas(): Observable<
    HttpClientServiceInterface<ProductoVenta[]>
  > {
    return this.http.get<HttpClientServiceInterface<ProductoVenta[]>>(
      ENDPOINTS.stockVentas.consultarProductos
    );
  }

  /**
   * @Servicio actualiza un productos de venta
   */
  actualizarProductoVentas(
    producto: any
  ): Observable<HttpClientServiceInterface<ProductoVenta[]>> {
    return this.http.put<HttpClientServiceInterface<ProductoVenta[]>>(
      ENDPOINTS.stockVentas.actualizarProducto,
      producto
    );
  }

  /**
   * @Servicio elimina un producto de venta
   */
  eliminarProductoVentas(
    idProducto: number
  ): Observable<HttpClientServiceInterface<ProductoVenta[]>> {
    return this.http.delete<HttpClientServiceInterface<ProductoVenta[]>>(
      ENDPOINTS.stockVentas.eliminarProducto+'/'+idProducto
    );
  }

  /**
   * @Servicio guarda un producto de venta
   */
  guardarProductoVentas(
    producto: any
  ): Observable<HttpClientServiceInterface<ProductoVenta[]>> {
    return this.http.post<HttpClientServiceInterface<ProductoVenta[]>>(
      ENDPOINTS.stockVentas.guardarProducto,
      producto
    );
  }

  /**
   * @Servicio consulta todos los productos que pueden estar en el stock de venta
   */
  consultarProductosVenta(): Observable<
    HttpClientServiceInterface<Producto[]>
  > {
    return this.http.get<HttpClientServiceInterface<Producto[]>>(
      ENDPOINTS.productos.consultarProductosVenta
    );
  }
}
