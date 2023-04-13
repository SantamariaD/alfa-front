import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import {
  HttpClientServiceInterface,
  HttpClientServiceInterfaceNoPayload,
} from '../../interface/httpService';
import { Documento } from '../../interface/documentos';
import { ENDPOINTS } from '../../utils/endpoint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentosService {
  constructor(private http: HttpclientService) {}

  // Método para traer documentos
  traerDocumentos(): Observable<HttpClientServiceInterface<Documento[]>> {
    return this.http.get<HttpClientServiceInterface<Documento[]>>(
      ENDPOINTS.documentos.traerDocumentosArea
    );
  }

  // Método para guardar un documento
  guardarDocumento(
    documentos: any
  ): Observable<HttpClientServiceInterface<Documento>> {
    return this.http.post<HttpClientServiceInterface<Documento>>(
      ENDPOINTS.documentos.guardarDocumentos,
      documentos
    );
  }

  // Método para actualizar el archivo de un documento
  actualizarArchivoDocumento(
    documento: any
  ): Observable<HttpClientServiceInterface<Documento>> {
    return this.http.post<HttpClientServiceInterface<Documento>>(
      ENDPOINTS.documentos.actualizarDocumento,
      documento
    );
  }

  // Método para actualizar el archivo de un documento
  descargarArchivoDocumento(
    documento: any
  ) {
    return this.http.get<Blob>(
      ENDPOINTS.documentos.descargarDocumento+'/'+documento.uuid+'/ '+documento.extension
    );
  }
}
