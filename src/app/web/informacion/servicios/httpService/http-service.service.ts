import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  peticionActivaAction,
  peticionInactivaAction,
} from '../../state/cargandoPeticion/cargandoPeticion.actions';

@Injectable({
  providedIn: 'root',
})
export class HttpclientService {
  constructor(private http: HttpClient, private store: Store) {}

  post<T>(url: string, body?: any, spin = true): Observable<T> {
    const urlBase = environment.production
      ? environment.urls.backProduction
      : environment.urls.backDevelop;
    const token = localStorage.getItem('token') as string;
    return this.http
      .post<T>(urlBase + url, body || {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .pipe(
        finalize(() => {
          if (spin) this.store.dispatch(peticionActivaAction());
          setTimeout(() => {
            if (spin) this.store.dispatch(peticionInactivaAction());
          }, 1000);
        })
      );
  }

  get<T>(url: string, spin = true): Observable<T> {
    const urlBase = environment.production
      ? environment.urls.backProduction
      : environment.urls.backDevelop;
    const token = localStorage.getItem('token') as string;
    setTimeout(() => {
      if (spin) this.store.dispatch(peticionActivaAction());
    }, 0);

    return this.http
      .get<T>(urlBase + url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        finalize(() => {
          setTimeout(() => {
            if (spin) this.store.dispatch(peticionInactivaAction());
          }, 1000);
        })
      );
  }

  put<T>(url: string, body?: any, spin = true): Observable<T> {
    const urlBase = environment.production
      ? environment.urls.backProduction
      : environment.urls.backDevelop;
    const token = localStorage.getItem('token') as string;
    return this.http
      .put<T>(urlBase + url, body || {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .pipe(
        finalize(() => {
          if (spin) this.store.dispatch(peticionActivaAction());
          setTimeout(() => {
            if (spin) this.store.dispatch(peticionInactivaAction());
          }, 1000);
        })
      );
  }
}
