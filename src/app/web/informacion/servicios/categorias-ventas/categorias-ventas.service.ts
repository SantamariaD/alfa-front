import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../../interface/categorias';
import { HttpClientServiceInterface, HttpClientServiceInterfaceNoPayload } from '../../interface/httpService';
import { ENDPOINTS } from '../../utils/endpoint';
import { HttpclientService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriasVentasService {

  constructor(private http: HttpclientService) {}

  /**
   * @Servicio trae las categorias de los productos
   */
  traerCategorias(): Observable<HttpClientServiceInterface<Categoria[]>> {
    return this.http.get<HttpClientServiceInterface<Categoria[]>>(
      ENDPOINTS.categoriasVentas.consultarCategorias
    );
  }

  /**
   * @Servicio Crea una categoria de los productos
   */
  crearCategorias(
    categoria: any
  ): Observable<HttpClientServiceInterfaceNoPayload> {
    return this.http.post<HttpClientServiceInterfaceNoPayload>(
      ENDPOINTS.categoriasVentas.crearCategorias,
      { categoria }
    );
  }

  /**
   * @Servicio elimina una categoria de los productos
   */
  eliminarCategoria(
    id: any
  ): Observable<HttpClientServiceInterfaceNoPayload> {
    return this.http.delete<HttpClientServiceInterfaceNoPayload>(
      ENDPOINTS.categoriasVentas.eliminarCategorias + '/' + id
    );
  }
}
