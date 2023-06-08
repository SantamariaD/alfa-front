import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Proveedor } from 'src/app/web/informacion/interface/proveedores';

@Component({
  selector: 'app-eliminar-proveedor',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss']
})
export class EliminarComponent implements OnInit {
  /**
   * @Input proveedor: Información del proveedor mostrado en la card
   */
  @Input() proveedor: Proveedor = {} as Proveedor;

  /**
   * @Output actualizarProveedor: emite el evento de actualizar proveedor
   */
  @Output() eliminarProveedorEmit = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
