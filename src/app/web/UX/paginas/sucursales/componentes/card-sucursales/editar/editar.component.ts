import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Empleados } from 'src/app/web/informacion/interface/empleados';
import { ConsultaSucursales } from 'src/app/web/informacion/interface/sucursales';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  /**
   * @Input sucursal: Información de la sucursal mostrado en la card
   */
  @Input() sucursal: ConsultaSucursales = {} as ConsultaSucursales;

  /**
   * @Input empleados: Catalogo de empleados
   */
  @Input() empleados: Empleados[] = [];

  /**
   * @Output actualizarSucursalEmit: emite el evento de actualizar sucursal
   */
  @Output() actualizarSucursalEmit = new EventEmitter<any>();

  /**
   * @Formulario editarForm: fomulario para editar la sucursal
   */
  editarForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    nombreSucursal: new FormControl(''),
    idEncargado: new FormControl(0),
    telefono: new FormControl(''),
    correo: new FormControl(''),
    horarioAtencion: new FormControl(''),
    domicilio: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {
    this.editarForm.patchValue({
      id: this.sucursal.id,
      nombreSucursal: this.sucursal.nombreSucursal,
      correo: this.sucursal.correo,
      horarioAtencion: this.sucursal.horarioAtencion,
      domicilio: this.sucursal.domicilio,
      telefono: this.sucursal.telefono,
      idEncargado: this.sucursal.idEncargado,
    });
  }

  /**
   * @Metodo Actualiza la información de la sucursal
   */
  actualizarProducto(): void {
    this.actualizarSucursalEmit.emit(this.editarForm.value);
  }
}
