import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Proveedor } from 'src/app/web/informacion/interface/proveedores';

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

  constructor() {}

  ngOnInit(): void {}
}
