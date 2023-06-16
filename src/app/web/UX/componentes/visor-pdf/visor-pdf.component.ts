import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Documento } from 'src/app/web/informacion/interface/documentos';
import { ENDPOINTS } from 'src/app/web/informacion/utils/endpoint';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-visor-pdf',
  templateUrl: './visor-pdf.component.html',
  styleUrls: ['./visor-pdf.component.scss'],
})
export class VisorPdfComponent implements OnInit {
  /**
   * @Input path: Path del documento de descarga
   */
  @Input() path: string = '';

  /**
   * @Output clickCerrar: Manda el evento click del boton cerrar
   */

  @Output() clickCerrar = new EventEmitter<boolean>();

  /**
   * @Variable nombrePdf: Contiene el nombre del pdf que se esta mostrando
   */
  nombrePdf = 'Nombre del PDF';

  /**
   * @Variable porcentaje: Porcentaje del tamaño del pdf
   */
  porcentaje = '100%';

  /**
   * @Variable zoom: contiene el porcentaje del tamaño del zoom
   */
  zoom = 0.97;

  constructor() {}

  ngOnInit(): void {}

  /**
   * @Metodo cerrar modal
   */
  clickCerrarModal(): void {
    this.clickCerrar.emit(false);
  }

  /**
   * @Metodo agranda el pdf
   */
  clickMas(): void {
    switch (true) {
      case this.zoom == 0.9:
        this.zoom = 0.97;
        this.porcentaje = '100%';
        break;
      case this.zoom == 0.8:
        this.zoom = 0.9;
        this.porcentaje = '90%';
        break;
      case this.zoom == 0.65:
        this.zoom = 0.8;
        this.porcentaje = '80%';
        break;
      case this.zoom == 0.5:
        this.zoom = 0.65;
        this.porcentaje = '65%';
        break;
      case this.zoom == 0.3:
        this.zoom = 0.5;
        this.porcentaje = '50%';
        break;
      case this.zoom == 0.25:
        this.zoom = 0.3;
        this.porcentaje = '30%';
        break;
      case this.zoom == 0.97:
        this.zoom = 1.2;
        this.porcentaje = '120%';
        break;
      case this.zoom == 1.2:
        this.zoom = 1.5;
        this.porcentaje = '150%';
        break;
      case this.zoom == 1.5:
        this.zoom = 1.75;
        this.porcentaje = '175%';
        break;
      case this.zoom == 1.75:
        this.zoom = 2;
        this.porcentaje = '200%';
        break;
      default:
        break;
    }
  }

  /**
   * @Metodo hace más pequeño el pdf
   */
  clickMenos(): void {
    switch (true) {
      case this.zoom == 0.97:
        this.zoom = 0.9;
        this.porcentaje = '90%';
        break;
      case this.zoom == 0.9:
        this.zoom = 0.8;
        this.porcentaje = '80%';
        break;
      case this.zoom == 0.8:
        this.zoom = 0.65;
        this.porcentaje = '65%';
        break;
      case this.zoom == 0.65:
        this.zoom = 0.5;
        this.porcentaje = '50%';
        break;
      case this.zoom == 0.5:
        this.zoom = 0.3;
        this.porcentaje = '30%';
        break;
      case this.zoom == 0.3:
        this.zoom = 0.25;
        this.porcentaje = '25%';
        break;
      case this.zoom == 1.2:
        this.zoom = 0.97;
        this.porcentaje = '100%';
        break;
      case this.zoom == 1.5:
        this.zoom = 1.2;
        this.porcentaje = '120%';
        break;
      case this.zoom == 1.75:
        this.zoom = 1.5;
        this.porcentaje = '150%';
        break;
      case this.zoom == 2:
        this.zoom = 1.75;
        this.porcentaje = '200%';
        break;
      default:
        break;
    }
  }
}
