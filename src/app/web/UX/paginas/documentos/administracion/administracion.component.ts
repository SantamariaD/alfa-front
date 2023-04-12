import { Component, OnInit } from '@angular/core';
import { secciones } from './fixture';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentosService } from 'src/app/web/informacion/servicios/documentos/documentos.service';
import { Documento } from 'src/app/web/informacion/interface/documentos';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss'],
})
export class AdministracionComponent implements OnInit {
  /**
   * @variable secciones: Contiene la información del encabezado de la sección.
   */
  secciones = secciones;

  /**
   * @variable isVisible: Variable que abre y cierra el modal
   */
  isVisible = false;

  /**
   * @variable textoArchivo: contiene el nombre del archivo cargado
   */
  textoArchivo = '';

  /**
   * @variable documentos: Array de documentos de administración
   */
  documentos: Array<Documento> = [];

  /**
   * @variable mostarDocumentos: Muestro documentos si es que hay
   */
  mostarDocumentos = false;

  /**
   * @variable modificarDocumentoVisible: Muestra el modal para modificar el documento
   */
  modificarDocumentoVisible = false;

  /**
   * @formulario documentoForm: Formulario para guardar un documento nuevo
   */
  documentoForm: FormGroup = new FormGroup({
    nombre_archivo: new FormControl('', [Validators.required]),
    file0: new FormControl('', [Validators.required]),
    id: new FormControl(0),
  });

  /**
   * @formulario documentoForm: Formulario para guardar un documento nuevo
   */
  documentoActualizarForm: FormGroup = new FormGroup({
    nombre_archivo: new FormControl(''),
    file0: new FormControl(''),
    id: new FormControl(0),
    id_user: new FormControl(0),
    uuid: new FormControl(''),
    extension: new FormControl(''),
    area: new FormControl(''),
    posicion: new FormControl(''),
  });

  /**
   * @formulario formArchivo: contiene el archivo
   */
  archivoForm = new FormData();

  /**
   * @formulario documentoFormData: Formulario para guardar un documento nuevo formData
   */
  documentoFormData = new FormData();

  constructor(private documentosService: DocumentosService) {}

  ngOnInit(): void {
    this.traerDocumentos();
  }

  // Método para ver un archivo de un documento
  verArchivo(): void {
    console.log('ver archivo');
  }

  // Método para eliminar un archivo de un documento
  eliminarArchivo(): void {
    console.log('eliminar archivo');
  }

  // Método para abrir un modal
  showModal(): void {
    this.isVisible = true;
  }

  // Método para abrir un modal
  cerrarModal(): void {
    this.isVisible = false;
    this.modificarDocumentoVisible = false;
    this.documentoForm.reset();
    this.documentoActualizarForm.reset();
    this.textoArchivo = '';
  }

  // Método para guardar un documento
  guardarDocumento(): void {
    this.documentoForm.patchValue({
      id: parseInt(localStorage.getItem('id') || ''),
    });
    this.documentoFormData.append('file0', this.documentoForm.value.file0);
    this.documentoFormData.append('area', 'administracion');
    this.documentoFormData.append(
      'nombre_archivo',
      this.documentoForm.value.nombre_archivo
    );
    this.documentoFormData.append('id_user', this.documentoForm.value.id);

    this.documentosService
      .guardarDocumento(this.documentoFormData)
      .pipe(
        finalize(() => {
          this.mostarDocumentos = false;
          this.isVisible = false;
          this.documentoForm.reset();
          this.textoArchivo = '';
          this.mostarDocumentos = true;
        })
      )
      .subscribe(
        (respuestaGuardarArchivo: HttpClientServiceInterface<Documento>) =>
          this.documentos.push(respuestaGuardarArchivo.payload)
      );
  }

  // Método para guardar un archivo en el formulario de agregar documento
  archivoDocumento(event: any): void {
    const archivo = event.target.files[0];

    if (archivo) {
      this.documentoForm.patchValue({ file0: archivo });
      this.textoArchivo = archivo.name;
    }
  }

  // Método para guardar un archivo en el formulario de agregar documento para actualizar
  archivoDocumentoModificar(event: any): void {
    const archivo = event.target.files[0];

    if (archivo) {
      this.documentoActualizarForm.patchValue({ file0: archivo });
      this.textoArchivo = archivo.name;
    }
  }

  // Método para abrir el modal de modificar documento
  modalModificarArchivo(documento: Documento, posicion: number): void {
    this.modificarDocumentoVisible = true;
    this.documentoActualizarForm.patchValue({
      id: documento.id,
      nombre_archivo: documento.nombre_archivo,
      uuid: documento.uuid,
      extension: documento.extension,
      area: documento.area,
      posicion: posicion,
    });
  }

  // Método para modificar el archivo de un documento
  archivoCargado(documento: any): void {
    if (documento.file0) this.archivoForm.append('file0', documento.file0);

    this.archivoForm.append('id', documento.id);
    this.archivoForm.append('id_user', documento.id_user);
    this.archivoForm.append('nombre_archivo', documento.nombre_archivo);
    this.archivoForm.append('uuid', documento.uuid);
    this.archivoForm.append('extension', documento.extension);
    this.archivoForm.append('area', documento.area);

    this.documentosService
      .actualizarArchivoDocumento(this.archivoForm)
      .pipe(
        finalize(() => {
          this.archivoForm.forEach((value, key) => {
            this.archivoForm.delete(key);
          });
          this.mostarDocumentos = true;
        })
      )
      .subscribe(
        (respuestaActualizar: HttpClientServiceInterface<Documento>) => {
          console.log(respuestaActualizar);
          this.mostarDocumentos = false;
          this.documentos.splice(
            documento.posicion,
            1,
            respuestaActualizar.payload
          );
        }
      );
  }

  // Metodo para mandar a actualizar un documento
  actualizarDocumento(): void {
    this.documentoActualizarForm.patchValue({
      id_user: parseInt(localStorage.getItem('id') || ''),
    });

    this.archivoCargado(this.documentoActualizarForm.value);
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
}
