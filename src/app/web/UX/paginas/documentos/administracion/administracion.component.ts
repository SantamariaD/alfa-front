import { Component, OnInit } from '@angular/core';
import { secciones } from './fixture';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DocumentosBackService } from 'src/app/web/informacion/servicios-back/documentos-back/documentos-back.service';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { Documentos } from 'src/app/web/informacion/interface/documentos';
import { DocumentosLogica } from 'src/app/web/informacion/servicios/documentos/DocumentodLogica';

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
   * @formulario formArchivo: contiene el archivo
   */
  archivoForm: FormGroup;

  /**
   * @variable isVisible: Variable que abre y cierra el modal
   */
  isVisible = false;

  /**
   * @variable textoArchivo: contiene el nombre del archivo cargado
   */
  textoArchivo = '';

  /**
   * @formulario documentoForm: Formulario para guardar un documento nuevo
   */
  documentoForm: FormGroup = new FormGroup({
    nombre_archivo: new FormControl('', [Validators.required]),
    file0: new FormControl('', [Validators.required]),
  });

  
  constructor(
    private logica: DocumentosLogica,
    private formBuilder: FormBuilder
  ) {
    this.archivoForm = this.formBuilder.group({
      archivo: [''],
    });
  }

  ngOnInit(): void {
    this.traerDocumentos();
  }

  // Método para modificar el archivo de un documento
  archivoCargado(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.archivoForm.get('archivo')?.setValue(file);
      console.log(this.archivoForm.value.archivo);
    }
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

  // Método para guardar un documento
  guardarDocumento(): void {
    this.isVisible = false;
    this.documentoForm.reset();
    this.textoArchivo = '';
    console.log(this.documentoForm.value);
  }

  // Método para guardar un archivo en el formulario de agregar documento
  archivoDocumento(event: any): void {
    const archivo = event.target.files[0];

    if (archivo) {
      this.documentoForm.patchValue({ file0: archivo });
      this.textoArchivo = archivo.name;
    }
  }

  // Método para traer los documentos
  private async traerDocumentos() {
    try {
      const documentos = await this.logica.traerDocumentos();
      console.log(documentos);
    } catch (error) {
      console.error(error);
    }
  }
}
