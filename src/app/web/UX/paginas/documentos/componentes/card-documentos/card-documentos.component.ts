import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Documento } from 'src/app/web/informacion/interface/documentos';
import { DocumentosService } from 'src/app/web/informacion/servicios/documentos/documentos.service';
import { ENDPOINTS } from 'src/app/web/informacion/utils/endpoint';
import { environment } from 'src/environments/environment';

import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';

@Component({
  selector: 'app-card-documentos',
  templateUrl: './card-documentos.component.html',
  styleUrls: ['./card-documentos.component.scss'],
})
export class CardDocumentosComponent implements OnInit {
  /**
   * @Input documento: Información del documento mostrado en la card
   */
  @Input() documento: Documento = {} as Documento;

  /**
   * @Input mostrarCardDocumento: Controla si se muestra o no la card
   */
  @Input() mostrarCardDocumento = false;

  /**
   * @Output clickCerrar: manda el evento al dar click sobre el icono X
   */
  @Output() clickCerrar = new EventEmitter<any>();

  /**
   * @variable docActualizados: Array de documentos de despues de actualizar un documento
   */

  @Output() docActualizados = new EventEmitter<Documento[]>();

  /**
   * @Variable seccionModal: Controla la sección que se muestra en el modal
   */
  seccionModal = 'informacion';

  /**
   * @variable urlDescarga: contiene la url de descarga
   */
  urlDescarga = '';
  

  constructor(
    private documentosService: DocumentosService,
  ) {
    const urlBase = environment.production
      ? environment.urls.backProduction
      : environment.urls.backDevelop;
    this.urlDescarga = urlBase + ENDPOINTS.documentos.descargarDocumento;
  }

  ngOnInit(): void {}

  // Método para ver un archivo de un documento
  descargarArchivo(documento: Documento): void {
    this.documentosService
      .descargarArchivoDocumento(documento)
      .subscribe((respuestaDocumentos: Blob) => {
        const url = URL.createObjectURL(respuestaDocumentos);
        window.open(url);
      });
  }

  ActualizaDatos() {
    this.docActualizados.emit();
    this.seccionModal = 'informacion';
  }

  // Modal borrar
  modalBorrar(): void {
    this.seccionModal = 'eliminar';
  }

  /**
   * @Metodo cambia a la seccion informacion
   */
  clickInformacion(): void {
    this.seccionModal = 'informacion';
  }

  /**
   * @Metodo cambia a la seccion agregar
   */
  clickAgregar(): void {}

  /**
   * @Metodo cambia a la seccion editar
   */
  clickEditar(): void {
    this.seccionModal = 'editar';
  }

  /**
   * @Metodo cerrar modal
   */
  clickCerrarModal(): void {
    this.clickCerrar.emit(false);
    this.seccionModal = 'informacion';
  }
}
