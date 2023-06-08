import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Documento } from 'src/app/web/informacion/interface/documentos';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { DocumentosService } from 'src/app/web/informacion/servicios/documentos/documentos.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

   /**
   * @variable documento: Objeto de un documento seleccionado
   */

  @Input() documento:Documento = {} as Documento

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
  textoArchivo = '';

  /**
   * @formulario formArchivo: contiene el archivo
   */
  archivoForm = new FormData();

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
   * 
   * @variable mostrarNotificacion 
   */
  mostrarNotificacion = false;

  constructor(private documentosService:DocumentosService) { }

  ngOnInit(): void {
    this.modalModificarArchivo(this.documento)
    
    console.log(this.documento)
    this.traerDocumentos()

  }
  
  // Método para guardar un archivo en el formulario de agregar documento para actualizar
  archivoDocumentoModificar(event: any): void {
    const archivo = event.target.files[0];

    if (archivo) {
      this.documentoActualizarForm.patchValue({ file0: archivo });
      this.textoArchivo = archivo.name;
    }
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
        })
      )
      .subscribe(
        (respuestaActualizar: HttpClientServiceInterface<Documento>) => {
          console.log(respuestaActualizar);
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
    this.docActualizados.emit();
  }

  // Método para traer los documentos
  private traerDocumentos() {
    this.documentosService
      .traerDocumentos()
      .subscribe(
        (respuestaDocumentos: HttpClientServiceInterface<Array<Documento>>) => {
          console.log(respuestaDocumentos);
          
        }
      );
  }

  //Método para llenar los campos del formulario
  modalModificarArchivo(documento: Documento): void {
    this.documentoActualizarForm.patchValue({
      id: documento.id,
      nombre_archivo: documento.nombre_archivo,
      uuid: documento.uuid,
      extension: documento.extension,
      area: documento.area,
      posicion: '',
    });
  }

}
