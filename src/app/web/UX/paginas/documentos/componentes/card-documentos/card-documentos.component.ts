import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Area } from 'src/app/web/informacion/interface/areas';
import { Documento } from 'src/app/web/informacion/interface/documentos';
import { ENDPOINTS } from 'src/app/web/informacion/utils/endpoint';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-card-documentos',
  templateUrl: './card-documentos.component.html',
  styleUrls: ['./card-documentos.component.scss'],
})
export class CardDocumentosComponent implements OnInit {
  /**
   * @Input areas: contiene las areas
   */
  @Input() areas: Array<Area> = [];
  
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
   * @variable clickVerDocumento: Emite el evento cuando se da click en ver documento
   */

  @Output() clickVerDocumento = new EventEmitter<boolean>();

  /**
   * @Variable seccionModal: Controla la sección que se muestra en el modal
   */
  seccionModal = 'informacion';

  /**
   * @variable urlDescarga: contiene la url de descarga
   */
  urlDescarga = '';
  

  constructor() {
    const urlBase = environment.production
      ? environment.urls.backProduction
      : environment.urls.backDevelop;
    this.urlDescarga = urlBase + ENDPOINTS.documentos.descargarDocumento;
  }

  ngOnInit(): void {}

  /**
   * @Modal Actualiza los datos del documento
   */
  ActualizaDatos() {
    this.docActualizados.emit();
    this.seccionModal = 'informacion';
  }

  /**
   * @Modal Muestra la sección de eliminar documento
   */
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
   * @Metodo cambia a la seccion editar
   */
  clickEditar(): void {
    this.seccionModal = 'editar';
  }

  /**
   * @Metodo cambia a la seccion editar
   */
  clickVer(): void {
    this.seccionModal = 'informacion';
    this.clickVerDocumento.emit(false);
  }

  /**
   * @Metodo cerrar modal
   */
  clickCerrarModal(): void {
    this.clickCerrar.emit(false);
    this.seccionModal = 'informacion';
  }
}
