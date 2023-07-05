import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria, EliminarCategoria } from '../../interface/categorias';
import { HttpClientServiceInterface } from '../../interface/httpService';
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
    categoria: string
  ): Observable<HttpClientServiceInterface<Categoria[]>> {
    return this.http.post<HttpClientServiceInterface<Categoria[]>>(
      ENDPOINTS.categoriasVentas.crearCategorias,
      { categoria }
    );
  }

  /**
   * @Servicio elimina una categoria de los productos
   */
  eliminarCategoria(
    id: number
  ): Observable<HttpClientServiceInterface<EliminarCategoria>> {
    return this.http.delete<HttpClientServiceInterface<EliminarCategoria>>(
      ENDPOINTS.categoriasVentas.eliminarCategorias + '/' + id
    );
  }
}
