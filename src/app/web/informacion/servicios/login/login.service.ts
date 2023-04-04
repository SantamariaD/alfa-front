import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize, Observable } from 'rxjs';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import {
  CerrarSesioninterface,
  LoginServiceInterface,
} from 'src/app/web/informacion/interface/login';
import { environment } from 'src/environments/environment';
import {
  peticionActivaAction,
  peticionInactivaAction,
} from '../../state/cargandoPeticion/cargandoPeticion.actions';
import { HttpclientService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpclientService,
    private httpClient: HttpClient,
    private store: Store
  ) {}

  login(
    correo: string,
    contrasena: string
  ): Observable<HttpClientServiceInterface<LoginServiceInterface>> {
    const urlBase = environment.production
      ? environment.urls.backProduction
      : environment.urls.backDevelop;
    const url = '/auth/login';

    return this.httpClient
      .post<HttpClientServiceInterface<LoginServiceInterface>>(urlBase + url, {
        email: correo,
        password: contrasena,
      })
      .pipe(
        finalize(() => {
          this.store.dispatch(peticionActivaAction());
          setTimeout(() => {
            this.store.dispatch(peticionInactivaAction());
          }, 1000);
        })
      );
  }

  cerrarSesionService(): Observable<CerrarSesioninterface> {
    const url = '/auth/logout';
    return this.http.post<CerrarSesioninterface>(url);
  }
}
