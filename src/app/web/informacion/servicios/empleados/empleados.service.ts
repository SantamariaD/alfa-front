import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { Observable } from 'rxjs';
import { HttpClientServiceInterface, HttpClientServiceInterfaceNoPayload } from '../../interface/httpService';
import { ENDPOINTS } from '../../utils/endpoint';
import { Producto } from '../../interface/productos';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private http: HttpclientService) { }

  
  /**
   * @Servicio consulta todos los productos de la base
   */
  traerTodosEmpleados(): Observable<
  
    HttpClientServiceInterface<Array<any>>
  > {
    return this.http.get<HttpClientServiceInterface<Array<Producto>>>(
      ENDPOINTS.empleados.traerEmpleados
    );
  }

  /**
   * @Servicio actualiza un producto
   */
  actualizarEmpleado(
    empleado: any
  ): Observable<HttpClientServiceInterfaceNoPayload> {
    return this.http.put<HttpClientServiceInterfaceNoPayload>(
      ENDPOINTS.empleados.actualizarEmpleado,
      empleado
    );
  }

  /**
   * @Servicio elimina un producto
   */
  eliminarEmpleado(
    id: number
  ): Observable<HttpClientServiceInterfaceNoPayload> {
    return this.http.delete<HttpClientServiceInterfaceNoPayload>(
      ENDPOINTS.empleados.eliminarEmpleado + '/' + id
    );
  }

  /**
   * @Servicio elimina un producto
   */
  traerEmpleado(
    id: number
  ): Observable<HttpClientServiceInterface<Producto>> {
    return this.http.get<HttpClientServiceInterface<Producto>>(
      ENDPOINTS.empleados.traerEmpleado + '/' + id
    );
  }

  crearEmpleado(
    empleado: any
  ): Observable<HttpClientServiceInterfaceNoPayload> {
    return this.http.post<HttpClientServiceInterfaceNoPayload>(
      ENDPOINTS.empleados.crearEmpleado,
      empleado
    );
  }


}
