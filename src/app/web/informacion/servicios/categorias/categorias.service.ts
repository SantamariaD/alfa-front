import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria, EliminarCategoriaCompra } from '../../interface/categorias';
import {
  HttpClientServiceInterface,
  HttpClientServiceInterfaceNoPayload,
} from '../../interface/httpService';
import { ENDPOINTS } from '../../utils/endpoint';
import { HttpclientService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  constructor(private http: HttpclientService) {}

  /**
   * @Servicio trae las categorias de los productos
   */
  traerCategorias(): Observable<HttpClientServiceInterface<Categoria[]>> {
    return this.http.get<HttpClientServiceInterface<Categoria[]>>(
      ENDPOINTS.categorias.consultarCategorias
    );
  }

  /**
   * @Servicio Crea una categoria de los productos
   */
  crearCategorias(
    categoria: any
  ): Observable<HttpClientServiceInterface<Categoria[]>> {
    return this.http.post<HttpClientServiceInterface<Categoria[]>>(
      ENDPOINTS.categorias.crearCategorias,
      { categoria }
    );
  }

  /**
   * @Servicio elimina una categoria de los productos
   */
  eliminarCategoria(
    id: any
  ): Observable<EliminarCategoriaCompra> {
    return this.http.delete<EliminarCategoriaCompra>(
      ENDPOINTS.categorias.eliminarCategorias + '/' + id
    );
  }
}
