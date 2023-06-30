import { Component, Input, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/web/informacion/interface/proveedores';

@Component({
  selector: 'app-informacion-proveedor',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {
  /**
   * @Input proveedor: Información del proveedor mostrado en la card
   */
  @Input() proveedor: Proveedor = {} as Proveedor;

  constructor() { }

  ngOnInit(): void {
  }

}
