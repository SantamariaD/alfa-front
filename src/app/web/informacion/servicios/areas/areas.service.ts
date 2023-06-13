import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../../interface/areas';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { ENDPOINTS } from '../../utils/endpoint';
import { HttpclientService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  constructor(private http: HttpclientService) {}

  /**
   * @Servicio Consulta de todas las áreas
   */
  consultarAreas(): Observable<HttpClientServiceInterface<Area[]>> {
    return this.http.get<HttpClientServiceInterface<Area[]>>(
      ENDPOINTS.areas.consultarAreas
    );
  }
}
