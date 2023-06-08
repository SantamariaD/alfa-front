import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClientServiceInterfaceNoPayload } from 'src/app/web/informacion/interface/httpService';
import { Proveedor } from 'src/app/web/informacion/interface/proveedores';
import { ProveedoresService } from 'src/app/web/informacion/servicios/proveedores/proveedores.service';

@Component({
  selector: 'app-eliminar-proveedor',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss'],
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

  constructor(private proveedoresService: ProveedoresService) {}

  ngOnInit(): void {}

  /**
   * @Metodo elimina el proveedor
   */
  clickEliminar(): void {
    this.proveedoresService.eliminarProveedor(this.proveedor.id).subscribe({
      next: (respuestaEliminar: HttpClientServiceInterfaceNoPayload) =>
        this.eliminarProveedorEmit.emit(true),
    });
  }
}
