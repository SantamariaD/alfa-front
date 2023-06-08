import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { Observable } from 'rxjs';
import { HttpClientServiceInterface, HttpClientServiceInterfaceNoPayload } from '../../interface/httpService';
import { Proveedor, RespuestaProveedores } from '../../interface/proveedores';
import { ENDPOINTS } from '../../utils/endpoint';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private http: HttpclientService) {}

  /**
   * @Servicio consulta todos los proveedores de la base
   */
  consultarProveedores(): Observable<
    HttpClientServiceInterface<RespuestaProveedores>
  > {
    return this.http.get<HttpClientServiceInterface<RespuestaProveedores>>(
      ENDPOINTS.proveedores.consultarProveedores
    );
  }

  /**
   * @Servicio actualiza un proveedor
   */
  actualizarProveedor(
    proveedor: any
  ): Observable<HttpClientServiceInterfaceNoPayload> {
    return this.http.put<HttpClientServiceInterfaceNoPayload>(
      ENDPOINTS.proveedores.actualizarProveedor,
      proveedor
    );
  }

  /**
   * @Servicio elimina un proveedor
   */
  eliminarProveedor(
    id: number
  ): Observable<HttpClientServiceInterfaceNoPayload> {
    return this.http.delete<HttpClientServiceInterfaceNoPayload>(
      ENDPOINTS.proveedores.eliminarProveedor + '/' + id
    );
  }

  /**
   * @Servicio Guarda un proveedor
   */
  guardarProveedor(
    proveedor: any
  ): Observable<HttpClientServiceInterfaceNoPayload> {
    return this.http.post<HttpClientServiceInterfaceNoPayload>(
      ENDPOINTS.proveedores.guardarProveedor,
      proveedor
    );
  }
}
