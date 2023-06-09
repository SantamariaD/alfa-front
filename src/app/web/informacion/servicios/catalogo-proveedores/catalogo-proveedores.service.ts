import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoProveedor } from '../../interface/catalogo-proveedores';
import {
  HttpClientServiceInterface,
  HttpClientServiceInterfaceNoPayload,
} from '../../interface/httpService';
import { ENDPOINTS } from '../../utils/endpoint';
import { HttpclientService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogoProveedoresService {
  constructor(private http: HttpclientService) {}

  /**
   * @Servicio Consulta el catálogo de un proveedor
   */
  consultarCatalogoProveedor(
    id: number
  ): Observable<HttpClientServiceInterface<CatalogoProveedor[]>> {
    return this.http.get<HttpClientServiceInterface<CatalogoProveedor[]>>(
      ENDPOINTS.catalogoProveedores.consultarCatalogo + '/' + id
    );
  }

  /**
   * @Servicio Elimina un producto del catálogo del proveedor
   */
  eliminarProductoCatalogo(
    id: number
  ): Observable<HttpClientServiceInterfaceNoPayload> {
    return this.http.delete<HttpClientServiceInterfaceNoPayload>(
      ENDPOINTS.catalogoProveedores.eliminarCatalogo + '/' + id
    );
  }
}
