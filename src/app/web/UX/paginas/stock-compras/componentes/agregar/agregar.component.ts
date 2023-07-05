import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/web/informacion/interface/categorias';
import {
  HttpClientServiceInterface,
  HttpClientServiceInterfaceNoPayload,
} from 'src/app/web/informacion/interface/httpService';
import { Producto } from 'src/app/web/informacion/interface/productos';
import { ProductosService } from 'src/app/web/informacion/servicios/productos/productos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
})
export class AgregarComponent implements OnInit {
  /**
   * @Input producto: Información del producto mostrado en la card
   */
  @Input() producto: Producto = {} as Producto;

  /**
   * @Input mostrarModal: Controla si se muestra o no el modal
   */
  @Input() mostrarModal = false;

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
    codigoBarras: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    sku: new FormControl('', [Validators.required]),
  });

  constructor(private productosService: ProductosService) {}

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
