import { Component, OnInit } from '@angular/core';
import {
  Documento,
  RespuestaDocumetosConsulta,
} from 'src/app/web/informacion/interface/documentos';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { ColumnaTabla } from 'src/app/web/informacion/interface/tabla';
import { DocumentosService } from 'src/app/web/informacion/servicios/documentos/documentos.service';

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
   * @variable secciones: Contiene la información del encabezado de la sección.
   */
  secciones = [{ texto: 'Tabla de Documentos', seleccionado: true }];

  /**
   * @variable cabecera: Contiene la cabecera a mostrar.
   */
  cabecera: string = 'Tabla de Documentos';

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

  constructor(private documentosService: DocumentosService) {}

  ngOnInit(): void {
    this.traerDocumentos();
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
}
