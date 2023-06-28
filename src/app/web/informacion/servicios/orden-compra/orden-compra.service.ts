import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { Observable, take } from 'rxjs';
import { HttpClientServiceInterface } from '../../interface/httpService';
import {
  ConsultaOrdenCompra,
  OrdenCompraInfo,
} from '../../interface/catalogo-proveedores';
import { ENDPOINTS } from '../../utils/endpoint';
import { selectOrdenesCompraStore } from '../../state';
import { Store } from '@ngrx/store';
import { formateoMoneda } from '../../utils/funciones';
import { guardarOrdenesCompra } from '../../state/ordenesCompra/ordenesCompra.actions';

@Injectable({
  providedIn: 'root',
})
export class OrdenCompraService {
  constructor(private http: HttpclientService, private store: Store) {}

  /**
   * @Servicio para guardar una orden de compra
   */
  guardarOrdenCompra(
    ordenCompra: any
  ): Observable<HttpClientServiceInterface<OrdenCompraInfo>> {
    return this.http.post<HttpClientServiceInterface<OrdenCompraInfo>>(
      ENDPOINTS.ordenCompra.guardarOrdenCompra,
      ordenCompra
    );
  }

  /**
   * @Servicio consulta todas las ordenes de compra
   */
  consultarOrdenesCompra(): Observable<
    HttpClientServiceInterface<Array<ConsultaOrdenCompra>>
  > {
    return this.http.get<
      HttpClientServiceInterface<Array<ConsultaOrdenCompra>>
    >(ENDPOINTS.ordenCompra.consultarOrdenesCompra);
  }

  /**
   * @Servicio Consulta todos las ordenes de compra formateo los datos y los guarda en redux
   */
  consultarOrdenesCompraRedux(): void {
    this.store
      .select(selectOrdenesCompraStore)
      .pipe(take(1))
      .subscribe((ordenesCompra: ConsultaOrdenCompra[]) => {
        if (ordenesCompra.length < 1) {
          this.consultarOrdenesCompra().subscribe({
            next: (
              respuestaConsulta: HttpClientServiceInterface<
                Array<ConsultaOrdenCompra>
              >
            ) => {
              respuestaConsulta.payload.map(
                (ordenCompra: ConsultaOrdenCompra) => {
                  ordenCompra.total = formateoMoneda(
                    parseFloat(ordenCompra.total)
                  );
                  ordenCompra.subtotal = formateoMoneda(
                    parseFloat(ordenCompra.subtotal)
                  );
                  return ordenCompra;
                }
              );
              this.store.dispatch(
                guardarOrdenesCompra({
                  ordenesCompra: respuestaConsulta.payload,
                })
              );
            },
          });
        }
      });
  }
}
