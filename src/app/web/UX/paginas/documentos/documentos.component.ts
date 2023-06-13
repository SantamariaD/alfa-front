import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Area } from 'src/app/web/informacion/interface/areas';
import {
  Documento,
  RespuestaDocumetosConsulta,
} from 'src/app/web/informacion/interface/documentos';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { ColumnaTabla } from 'src/app/web/informacion/interface/tabla';
import { AreasService } from 'src/app/web/informacion/servicios/areas/areas.service';
import { DocumentosService } from 'src/app/web/informacion/servicios/documentos/documentos.service';
import { ENDPOINTS } from 'src/app/web/informacion/utils/endpoint';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss'],
})
export class DocumentosComponent implements OnInit {
  /**
   * @variable documentos: Array de documentos de administración
   */
  documentos: Array<Documento> = [];

  /**
   * @variable ultimaActualizacion: Información de último documento actualizado
   */
  ultimaActualizacion: Documento = {} as Documento;

  /**
   * @variable seleccionado: documento de administración sleccionado
   */
  seleccionado: Documento = {} as Documento;

  /**
   * @variable mostrarCardDocumento:muestra el contenido de la card
   */
  mostrarCardDocumento = false;

  /**
   * @variable mostrarModalAgregar: muestra el modal para agregar
   */
  mostrarModalAgregar = false;
  /**
   * @variable mostrarVisor: muestra el visor de pdf
   */
  mostrarVisor = false;

  /**
   * @variable secciones: Contiene la información del encabezado de la sección.
   */
  secciones = [{ texto: 'Tabla de Documentos', seleccionado: true }];

  /**
   * @variable cabecera: Contiene la cabecera a mostrar.
   */
  cabecera: string = 'Tabla de Documentos';

  /**
   * @Variable areas: contiene las areas
   */
  areas: Array<Area> = [];

  /**
   * @variable columnasTabla: Columnas que contiene la tabla
   */
  columnasTabla: Array<ColumnaTabla> = [
    { columna: 'Nombre', llave: 'nombre_archivo', busqueda: true },
    { columna: 'Área', llave: 'area', busqueda: true },
    { columna: 'Tipo de archivo', llave: 'extension', busqueda: true },
    { columna: 'Fecha de creación', llave: 'created_at', busqueda: true },
    { columna: 'Fecha de Modificación', llave: 'updated_at', busqueda: true },
  ];

  urlDescarga: string = '';

  constructor(
    private documentosService: DocumentosService,
    private message: NzMessageService,
    private areasService: AreasService
  ) {}

  ngOnInit(): void {
    this.traerDocumentos();
    this.consultarAreas();
  }

  /**
   * @Metodo para actualizar la vista de los documentos al editar
   */
  ActualizaDatos() {
    this.traerDocumentos();
    this.mostrarCardDocumento = false;
  }

  /**
   * @Metodo para mostrar los datos de la fila seleccionada
   */
  clickFila(data: any) {
    this.seleccionado = data;
    this.mostrarCardDocumento = true;
  }

  /**
   * @Metodo Cierra el modal de documentos
   */
  clickCerrarModal(cerrar: boolean) {
    this.mostrarCardDocumento = cerrar;
  }

  /**
   * @Metodo Cierra el modal de documentos
   */
  cerrarVisor() {
    this.mostrarVisor = false;
  }

  /**
   * @Metodo para seleccionar cabeceras
   */
  selectSeccion(cabecera: string) {
    this.cabecera = cabecera;
  }

  /**
   * @Metodo muestra el modal de agregar documento
   */
  modalAgregar(): void {
    this.mostrarModalAgregar = true;
  }

  /**
   * @Metodo cierra el modal agregar
   */
  cerrarModalAgregar(): void {
    this.mostrarModalAgregar = false;
  }

  /**
   * @Metodo muestra el visor para el documento
   */
  clickVerDocumento(): void {
    this.mostrarCardDocumento = false;
    this.mostrarVisor = true;

    const urlBase = environment.production
      ? environment.urls.backProduction
      : environment.urls.backDevelop;
    this.urlDescarga =
      urlBase +
      ENDPOINTS.documentos.descargarDocumento +
      '/' +
      this.seleccionado.area +
      '/' +
      this.seleccionado.uuid +
      '/' +
      this.seleccionado.extension;
  }

  /**
   * @Metodo evento cuando se guarda un documento
   */
  guardarDocumento(): void {
    this.mostrarModalAgregar = false;
    this.message.success('Se guardó correctamente el documento');
    this.traerDocumentos();
  }

  /**
   * @Método para traer los documentos
   */
  private traerDocumentos() {
    this.documentosService
      .traerDocumentos()
      .subscribe(
        (
          respuestaDocumentos: HttpClientServiceInterface<RespuestaDocumetosConsulta>
        ) => {
          this.documentos = respuestaDocumentos.payload.documentos;
          this.ultimaActualizacion =
            respuestaDocumentos.payload.ultimaActualizacion;
        }
      );
  }

  /**
   * @Metodo consulta las áreas de la empresa
   */
  private consultarAreas(): void {
    this.areasService.consultarAreas().subscribe({
      next: (respuestAreas: HttpClientServiceInterface<Area[]>) =>
        (this.areas = respuestAreas.payload),
    });
  }
}
