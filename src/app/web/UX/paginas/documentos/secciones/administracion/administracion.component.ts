import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { secciones } from '../../fixture';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentosService } from 'src/app/web/informacion/servicios/documentos/documentos.service';
import { Documento } from 'src/app/web/informacion/interface/documentos';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ColumnaTabla } from 'src/app/web/informacion/interface/tabla';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss'],
})
export class AdministracionComponent implements OnInit, OnChanges {
  /**
   * @Input docCreado: Cambia su valos para actualizar la vista de docs creados
   */
  @Input() docCreado = '';

  /**
   * @variable documentos: Array de documentos de administración
   */
  documentos: Array<Documento> = [];

  /**
   * @variable seleccionado: documento de administración sleccionado
   */
  seleccionado: Documento = {} as Documento;

  /**
   * @variable mostrarCardDocumento:muestra el contenido de la card
   */
  mostrarCardDocumento = false;
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

  /**
   * @variable mostarDocumentos: Muestro documentos si es que hay
   */
  mostarDocumentos = false;

  constructor(
    private documentosService: DocumentosService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.traerDocumentos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this['docCreado'] !== '') {
      console.log('actualizado');
      this.traerDocumentos();
    }
  }

  // Método para traer los documentos
  private traerDocumentos() {
    this.documentosService
      .traerDocumentos()
      .subscribe(
        (respuestaDocumentos: HttpClientServiceInterface<Array<Documento>>) => {
          if (respuestaDocumentos.payload.length > 0)
            this.mostarDocumentos = true;
          this.documentos = respuestaDocumentos.payload;
        }
      );
  }

  //Metodo para actualizar la vista de los documentos al editar
  ActualizaDatos() {
    console.log('se manda');
    this.traerDocumentos();
    this.mostrarCardDocumento = false;
  }

  //Metodo para traer los datos de la fila seleccionada
  clickFila(data: any) {
    this.seleccionado = data;
    this.mostrarCardDocumento = true;
    console.log(data);
  }

  //
  clickCerrarModal(cerrar: boolean) {
    this.mostrarCardDocumento = cerrar;
  }
}
