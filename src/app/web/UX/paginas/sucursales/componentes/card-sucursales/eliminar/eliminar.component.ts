import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConsultaSucursales } from 'src/app/web/informacion/interface/sucursales';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss'],
})
export class EliminarComponent implements OnInit {
  /**
   * @Input sucursal: Información de la sucursal mostrado en la card
   */
  @Input() sucursal: ConsultaSucursales = {} as ConsultaSucursales;

  /**
   * @Output eliminarSucursal: emite el evento de elimiar Sucursal
   */
  @Output() eliminarSucursal = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * @Metodo elimina el producto
   */
  clickEliminar(): void {
    this.eliminarSucursal.emit(this.sucursal.id);
  }
}
