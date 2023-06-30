import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Area } from 'src/app/web/informacion/interface/areas';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { AreasService } from 'src/app/web/informacion/servicios/areas/areas.service';
import { DocumentosService } from 'src/app/web/informacion/servicios/documentos/documentos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
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
   * @Output clickGuardarDocumento: manda el evento al guardar un documento
   */
  @Output() clickGuardarDocumento = new EventEmitter<any>();

  /**
   * @Variable textoArchivo: Cambia el texto del boton upload
   */
  textoArchivo = 'Subir archivo';

  /**
   * @formulario documentoFormData: Formulario para guardar un documento nuevo formData
   */
  documentoFormData = new FormData();

  /**
   * @Formulario documentoForm: fomulario para editar el documento
   */
  documentoForm: FormGroup = new FormGroup({
    nombre_archivo: new FormControl(''),
    id_user: new FormControl(0),
    id_area: new FormControl(0),
    area: new FormControl(''),
    file0: new FormControl(''),
  });

  constructor(
    private documentosService: DocumentosService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {}

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
    const area = this.areas.filter(
      (area: Area) => area.id == this.documentoForm.value.id_area
    )[0].area;

    this.documentoForm.patchValue({
      id_user: parseInt(localStorage.getItem('id') || ''),
      area,
      id_area: parseInt(this.documentoForm.value.id_area),
    });

    this.documentoFormData.append('file0', this.documentoForm.value.file0);
    this.documentoFormData.append('area', this.documentoForm.value.area);
    this.documentoFormData.append('id_area', this.documentoForm.value.id_area);
    this.documentoFormData.append('id_user', this.documentoForm.value.id_user);
    this.documentoFormData.append(
      'nombre_archivo',
      this.documentoForm.value.nombre_archivo
    );

    this.documentosService.guardarDocumento(this.documentoFormData).subscribe({
      next: () => this.clickGuardarDocumento.emit(),
      error: (error) => console.log(error),
    });
  }

  /**
   * @Metodo para guardar un archivo en el formulario de agregar documento
   */
  archivoDocumento(event: any): void {
    const archivo = event.target.files[0];

    if (archivo) {
      this.documentoForm.patchValue({ file0: archivo });
      this.textoArchivo = archivo.name;
    }
  }
}
