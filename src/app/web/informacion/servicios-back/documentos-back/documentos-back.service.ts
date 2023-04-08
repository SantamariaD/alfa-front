import { Injectable } from '@angular/core';
import { HttpclientService } from '../../servicios/httpService/http-service.service';
import { Documentos } from '../../interface/documentos';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../utils/endpoint';

@Injectable({
  providedIn: 'root',
})
export class DocumentosBackService {
  constructor(private http: HttpclientService) {}

  // Método para traer documentos
  traerDocumentos(): Promise<HttpClientServiceInterface<Documentos>> {
    return new Promise((resolve) => {
      this.http
        .get<HttpClientServiceInterface<Documentos>>(
          ENDPOINTS.documentos.traerDocumentosArea
        )
        .subscribe(
          (respuesta: HttpClientServiceInterface<Documentos>) =>
            (resolve(respuesta))
        );
    });
  }
}
