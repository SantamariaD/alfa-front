import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { ProductoOrdenCompra } from '../../interface/catalogo-proveedores';
import { ENDPOINTS } from '../../utils/endpoint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoOrdenCompraService {
  constructor(private http: HttpclientService) {}

  /**
   * @Servicio para guardar un producto de una orden de compra
   */
  guardarProductoOrdenCompra(
    productoOrdenCompra: any
  ): Observable<HttpClientServiceInterface<ProductoOrdenCompra>> {
    return this.http.post<HttpClientServiceInterface<ProductoOrdenCompra>>(
      ENDPOINTS.productosOrdenCompra.guardarOrdenCompra,
      productoOrdenCompra
    );
  }
}
