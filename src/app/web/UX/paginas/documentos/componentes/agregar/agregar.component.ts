import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Area } from 'src/app/web/informacion/interface/areas';
import { DocumentosService } from 'src/app/web/informacion/servicios/documentos/documentos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  /**
   * @Input areas: contiene las areas
   */
  @Input() areas: Array<Area> = [];

  /**
   * @Output clickCerrar: manda el evento al dar click sobre el icono X
   */
  @Output() clickCerrar = new EventEmitter<any>();

  /**
   * @Output clickGuardarProducto: manda el evento al guardar producto
   */
  @Output() clickGuardarProducto = new EventEmitter<any>();

  /**
   * @formulario documentoFormData: Formulario para guardar un documento nuevo formData
   */
  documentoFormData = new FormData();

  /**
   * @Formulario documentoForm: fomulario para editar el producto
   */
  documentoForm: FormGroup = new FormGroup({
    nombre_archivo: new FormControl('', [Validators.required]),
    id_user: new FormControl('', [Validators.required]),
    id_area: new FormControl(0, [Validators.required]),
    area: new FormControl('', [Validators.required]),
    file0: new FormControl('', [Validators.required]),
  });

  constructor(private documentosService: DocumentosService) { }

  ngOnInit(): void {
  }

  /**
   * @Metodo cierra el modal
   */
  cerrarModal(): void {
    this.clickCerrar.emit(false);
  }

  /**
   * @Metodo guarda el documento
   */
  guardarDocumento(): void {
    this.documentoForm.patchValue({
      id_user: parseInt(localStorage.getItem('id') || ''),
    });
    this.documentoFormData.append('file0', this.documentoForm.value.file0);
    this.documentoFormData.append('area', this.documentoForm.value.area);
    this.documentoFormData.append(
      'nombre_archivo',
      this.documentoForm.value.nombre_archivo
    );
    this.documentoFormData.append('id_user', this.documentoForm.value.id);

    this.documentosService
      .guardarDocumento(this.documentoFormData)
      .subscribe(
        (respuestaGuardarArchivo: any) =>respuestaGuardarArchivo
          //this.documentos.push(respuestaGuardarArchivo.payload)
      );
  }

  // Método para guardar un archivo en el formulario de agregar documento
  archivoDocumento(event: any): void {
    const archivo = event.target.files[0];

    if (archivo) {
      this.documentoForm.patchValue({ file0: archivo });
      //this.textoArchivo = archivo.name;
    }
  }

  // Método para guardar un archivo en el formulario de agregar documento para actualizar
  archivoDocumentoModificar(event: any): void {
    const archivo = event.target.files[0];

    if (archivo) {
      //this.documentoActualizarForm.patchValue({ file0: archivo });
      //this.textoArchivo = archivo.name;
    }
  }

}
