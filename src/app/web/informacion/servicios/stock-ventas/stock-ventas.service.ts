import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { Observable } from 'rxjs';
import { ProductoVenta } from '../../interface/productos';
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
    HttpClientServiceInterface<Array<ProductoVenta>>
  > {
    return this.http.get<HttpClientServiceInterface<Array<ProductoVenta>>>(
      ENDPOINTS.stockVentas.consultarProductos
    );
  }

  /**
   * @Servicio consulta todos los productos de la base
   */
  actualizarProductoVentas(
    producto: any
  ): Observable<HttpClientServiceInterface<Array<ProductoVenta>>> {
    return this.http.put<HttpClientServiceInterface<Array<ProductoVenta>>>(
      ENDPOINTS.stockVentas.actualizarProducto,
      producto
    );
  }
}
