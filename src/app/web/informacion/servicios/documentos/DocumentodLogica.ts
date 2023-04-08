import { Injectable } from '@angular/core';
import { DocumentosBackService } from '../../servicios-back/documentos-back/documentos-back.service';
import { Documentos } from '../../interface/documentos';

@Injectable({
  providedIn: 'root',
})
export class DocumentosLogica {
  respuestaDocumentos: Documentos = {} as Documentos;

  constructor(private documentosServicio: DocumentosBackService) {}

  async traerDocumentos() {
    const documentos = await this.documentosServicio.traerDocumentos();
    const aux = documentos
    return aux.payload;
  }
}
