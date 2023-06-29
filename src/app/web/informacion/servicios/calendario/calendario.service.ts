import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../utils/endpoint';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(private http: HttpclientService) {}

  /**
   * @Servicio trae el calendario de un usuario
   */
  traerCalendarioUsuario(): Observable<HttpClientServiceInterface<any>> {
    return this.http.get<HttpClientServiceInterface<any>>(
      ENDPOINTS.calendario.consultarCalendarioUsuario
    );
  }
}
