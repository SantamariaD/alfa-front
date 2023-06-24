import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { Observable } from 'rxjs';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { OrdenCompraInfo } from '../../interface/catalogo-proveedores';
import { ENDPOINTS } from '../../utils/endpoint';

@Injectable({
  providedIn: 'root',
})
export class OrdenCompraService {
  constructor(private http: HttpclientService) {}

  /**
   * @Servicio para guardar una orden de compra
   */
  guardarOrdenCompra(
    ordenCompra: any
  ): Observable<HttpClientServiceInterface<OrdenCompraInfo>> {
    return this.http.post<HttpClientServiceInterface<OrdenCompraInfo>>(
      ENDPOINTS.ordenCompra.guardarOrdenCompra,
      ordenCompra
    );
  }
}
