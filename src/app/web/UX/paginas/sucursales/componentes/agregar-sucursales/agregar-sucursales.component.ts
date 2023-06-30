import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agregar-sucursales',
  templateUrl: './agregar-sucursales.component.html',
  styleUrls: ['./agregar-sucursales.component.scss'],
})
export class AgregarSucursalesComponent implements OnInit {
  /**
   * @Output clickCerrar: manda el evento al dar click sobre el icono X
   */
  @Output() clickCerrar = new EventEmitter<any>();

  /**
   * @Output clickGuardarProducto: manda el evento al guardar producto
   */
  @Output() clickGuardarProducto = new EventEmitter<any>();

  /**
   * @Formulario agregarForm: fomulario para agregar la sucursal
   */
  agregarForm: FormGroup = new FormGroup({
    nombreSucursal: new FormControl(''),
    idEncargado: new FormControl(0),
    telefono: new FormControl(''),
    correo: new FormControl(''),
    horarioAtencion: new FormControl(''),
    domicilio: new FormControl(''),
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
   * @Metodo guarda una sucursal nueva
   */
  guardarSucursal(): void {
    this.clickGuardarProducto.emit(this.agregarForm.value);
    this.clickCerrar.emit(false);
  }
}
