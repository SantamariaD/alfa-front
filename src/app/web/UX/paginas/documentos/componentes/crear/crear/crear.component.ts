import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs';
import { Documento } from 'src/app/web/informacion/interface/documentos';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { DocumentosService } from 'src/app/web/informacion/servicios/documentos/documentos.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  /**
   * @Output docCreado: Evento cuando se crea nvo documento y actualizar vista
   */
  @Output() docCreado= new EventEmitter<any>();;

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
   * @variable isVisible: Variable que abre y cierra el modal
   */
  isVisible = false;

  /**
   * @variable textoArchivo: contiene el nombre del archivo cargado
   */
  textoArchivo = '';

  /**
   * @formulario formArchivo: contiene el archivo
   */
  archivoForm = new FormData();

  /**
   * @formulario documentoFormData: Formulario para guardar un documento nuevo formData
   */
  documentoFormData = new FormData();

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
  constructor(private documentosService: DocumentosService,
    private modal: NzModalService) { }

  ngOnInit(): void {
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
        (respuestaGuardarArchivo: any) =>
          this.documentos.push(respuestaGuardarArchivo.payload)
      );
      this.docCreado.emit();
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

   // Método para traer los documentos
   private traerDocumentos() {
    this.documentosService
      .traerDocumentos()
      .subscribe(
        (respuestaDocumentos: HttpClientServiceInterface<Array<Documento>>) => {
          if (respuestaDocumentos.payload.length > 0)
            this.mostarDocumentos = true;
            respuestaDocumentos.payload.forEach(documento =>{
              if(documento.area === 'administracion'){
                 this.documentos.push(documento);
              }
            })
          
        }
      );
  }

}
