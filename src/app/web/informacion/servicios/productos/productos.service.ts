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
}
