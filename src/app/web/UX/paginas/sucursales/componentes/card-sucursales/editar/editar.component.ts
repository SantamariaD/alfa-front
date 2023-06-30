import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
   * @Output actualizarSucursalEmit: emite el evento de actualizar sucursal
   */
  @Output() actualizarSucursalEmit = new EventEmitter<any>();

  /**
   * @Formulario editarForm: fomulario para editar la sucursal
   */
  editarForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    nombreSucursal: new FormControl(''),
    nombreEncargado: new FormControl({ value: '', disabled: true }),
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
      nombreEncargado:
        this.sucursal.nombreEncargado +
        ' ' +
        this.sucursal.apellidoPaternoEncargado +
        ' ' +
        this.sucursal.apellidoMaternoEncargado,
    });
  }

  /**
   * @Metodo Actualiza la información de la sucursal
   */
  actualizarProducto(): void {
    this.actualizarSucursalEmit.emit(this.editarForm.value);
  }
}
