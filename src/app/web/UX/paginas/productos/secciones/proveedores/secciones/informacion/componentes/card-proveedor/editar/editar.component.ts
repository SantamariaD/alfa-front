import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClientServiceInterfaceNoPayload } from 'src/app/web/informacion/interface/httpService';
import { Proveedor } from 'src/app/web/informacion/interface/proveedores';
import { ProveedoresService } from 'src/app/web/informacion/servicios/proveedores/proveedores.service';

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  /**
   * @Input proveedor: Información del proveedor mostrado en la card
   */
  @Input() proveedor: Proveedor = {} as Proveedor;

  /**
   * @Output actualizarProveedor: emite el evento de actualizar proveedor
   */
  @Output() actualizarProveedorEmit = new EventEmitter<any>();

  /**
   * @Formulario editarForm: fomulario para editar el producto
   */
  editarForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    telefono: new FormControl(0),
    domicilio: new FormControl(''),
    correo: new FormControl(''),
    sitioWeb: new FormControl(''),
  });

  constructor(private proveedoresService: ProveedoresService) {}

  ngOnInit(): void {
    this.editarForm.patchValue({
      id: this.proveedor.id,
      nombre: this.proveedor.nombre,
      telefono: this.proveedor.telefono,
      correo: this.proveedor.correo,
      domicilio: this.proveedor.domicilio,
      sitioWeb: this.proveedor.sitioWeb,
    });
  }

  /**
   * @Metodo Actualiza la información del proveedor
   */
  actualizarProveedor(): void {
    this.proveedoresService
      .actualizarProveedor(this.editarForm.value)
      .subscribe({
        next: (respuestaProveedors: HttpClientServiceInterfaceNoPayload) =>
          this.actualizarProveedorEmit.emit(true),
      });
  }
}
