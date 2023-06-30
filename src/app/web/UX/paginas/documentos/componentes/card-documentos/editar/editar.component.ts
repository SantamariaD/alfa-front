import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { Area } from 'src/app/web/informacion/interface/areas';
import { Documento } from 'src/app/web/informacion/interface/documentos';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { DocumentosService } from 'src/app/web/informacion/servicios/documentos/documentos.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  /**
   * @Input areas: contiene las areas
   */
  @Input() areas: Array<Area> = [];

  /**
   * @variable documento: Objeto de un documento seleccionado
   */

  @Input() documento: Documento = {} as Documento;

  /**
   * @variable docActualizados: Array de documentos de despues de actualizar un documento
   */

  @Output() docActualizados = new EventEmitter<Documento[]>();

  /**
   * @variable documentos: Array de documentos de administración
   */
  documentos: Array<Documento> = [];

  /**
   * @variable textoArchivo: contiene el nombre del archivo cargado
   */
  textoArchivo = 'Seleccionar archivo';

  /**
   * @formulario formArchivo: contiene el archivo
   */
  archivoForm = new FormData();

  /**
   * @formulario documentoForm: Formulario para guardar un documento nuevo
   */
  documentoActualizarForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    id_user: new FormControl(0),
    nombre_archivo: new FormControl(''),
    areaNueva: new FormControl(''),
    activo: new FormControl(''),
    file0: new FormControl(''),
    extension: new FormControl(''),
    uuid: new FormControl(''),
  });

  constructor(
    private documentosService: DocumentosService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.modalModificarArchivo(this.documento);
  }

  // Método para guardar la nueva información del archivo en el formulario
  modificarDatosDocumentoFormulario(event: any): void {
    const archivo = event.target.files[0];
    if (archivo) {
      this.documentoActualizarForm.patchValue({ file0: archivo });
      this.textoArchivo = archivo.name;
    }
  }

  // Método para modificar el archivo de un documento
  archivoCargado(documento: any): void {
    if (documento.file0) this.archivoForm.append('file0', documento.file0);

    if (
      this.documentoActualizarForm.value.areaNueva !== this.documento.id_area
    ) {
      const area = this.areas.filter(
        (area: Area) => area.id == this.documentoActualizarForm.value.areaNueva
      )[0];

      this.archivoForm.append(
        'areaNueva',
        this.documentoActualizarForm.value.areaNueva
      );
      this.archivoForm.append('areaAnterior', this.documento.area as string);
      this.archivoForm.append('area', area.area);
    } else {
      this.archivoForm.append('id_area', this.documento.id_area.toString());
      this.archivoForm.append('area', this.documento.area as string);
    }

    this.archivoForm.append('id', documento.id);
    this.archivoForm.append('id_user', documento.id_user);
    this.archivoForm.append('nombre_archivo', documento.nombre_archivo);
    this.archivoForm.append('uuid', documento.uuid);
    this.archivoForm.append('extension', documento.extension);

    this.documentosService
      .actualizarArchivoDocumento(this.archivoForm)
      .pipe(
        finalize(() => {
          this.archivoForm.forEach((value, key) => {
            this.archivoForm.delete(key);
          });
        })
      )
      .subscribe(
        (respuestaActualizar: HttpClientServiceInterface<Documento>) => {
          this.documentos.splice(
            documento.posicion,
            1,
            respuestaActualizar.payload
          );
          this.message.create(
            'success',
            `Se actualizó correctamente el documento`
          );
        }
      );
  }

  // Metodo para mandar a actualizar un documento
  actualizarDocumento(): void {
    this.archivoCargado(this.documentoActualizarForm.value);
    this.docActualizados.emit();
  }

  //Método para llenar los campos del formulario
  modalModificarArchivo(documento: Documento): void {
    this.documentoActualizarForm.patchValue({
      id: documento.id,
      id_user: documento.id_user,
      nombre_archivo: documento.nombre_archivo,
      areaNueva: documento.id_area,
      activo: documento.activo,
      extension: documento.extension,
      uuid: documento.uuid,
    });
  }
}
