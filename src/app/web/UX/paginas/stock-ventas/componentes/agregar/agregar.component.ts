import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/web/informacion/interface/categorias';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
})
export class AgregarComponent implements OnInit {
  /**
   * @Input categorias: contiene las categorias
   */
  @Input() categorias: Array<Categoria> = [];

  /**
   * @Output clickCerrar: manda el evento al dar click sobre el icono X
   */
  @Output() clickCerrar = new EventEmitter<any>();

  /**
   * @Output clickGuardarProducto: manda el evento al guardar producto
   */
  @Output() clickGuardarProducto = new EventEmitter<any>();

  /**
   * @Formulario editarForm: fomulario para editar el producto
   */
  guardarForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    categoria: new FormControl(0, [Validators.required]),
    cantidadStock: new FormControl('', [Validators.required]),
    precioVenta: new FormControl('', [Validators.required]),
    codigoBarras: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    sku: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}

  /**
   * @Metodo cierra el modal
   */
  cerrarModal(): void {
    this.clickCerrar.emit(false);
  }

  /**
   * @Metodo guarda un nuevo producto
   */
  guardarProducto(): void {
    this.clickGuardarProducto.emit(this.guardarForm.value);
    this.guardarForm.reset();
  }
}
