import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Categoria } from 'src/app/web/informacion/interface/categorias';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.scss'],
})
export class AgregarCategoriaComponent implements OnInit {
  /**
   * @Input categorias: contiene las categorias
   */
  @Input() categorias: Array<Categoria> = [];

  /**
   * @Output clickCerrar: manda el evento al dar click sobre el icono X
   */
  @Output() clickCerrar = new EventEmitter<any>();

  /**
   * @Output clickGuardarCategoria: manda el evento al guardar la categoria
   */
  @Output() clickGuardarCategoria = new EventEmitter<any>();

  /**
   * @Output clickEliminarCategoria: manda el evento al eliminar la categoria
   */
  @Output() clickEliminarCategoria = new EventEmitter<any>();

  /**
   * @Variable seccionModal: selecciona la seccion del modal
   */
  seccionModal = 'guardar';

  /**
   * @Formulario categoriaForm: fomulario para guardar categoria
   */
  categoriaForm = new FormControl('', [Validators.required]);

  /**
   * @Formulario idCategoriaForm: fomulario para eliminar categoria
   */
  idCategoriaForm = new FormControl(null, [Validators.required]);

  constructor() {}

  ngOnInit(): void {}

  /**
   * @Metodo cierra el modal
   */
  cerrarModal(): void {
    this.clickCerrar.emit(false);
  }

  /**
   * @Metodo guarda la categoría
   */
  guardarCategoria(): void {
    this.clickGuardarCategoria.emit(this.categoriaForm.value);
  }

  /**
   * @Metodo guarda la categoría
   */
  eliminarCategoria(): void {
    this.clickEliminarCategoria.emit(this.idCategoriaForm.value);
  }

  /**
   * @Metodo cambia a la seccion guardar
   */
  clickGuardar(): void {
    this.seccionModal = 'guardar';
  }

  /**
   * @Metodo cambia a la seccion eliminar
   */
  clickEliminar(): void {
    this.seccionModal = 'eliminar';
  }
}
