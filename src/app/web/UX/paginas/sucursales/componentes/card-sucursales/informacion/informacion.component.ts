import { Component, Input, OnInit } from '@angular/core';
import { ConsultaSucursales } from 'src/app/web/informacion/interface/sucursales';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {
  /**
   * @Input sucursal: Información de la sucursal mostrado en la card
   */
  @Input() sucursal: ConsultaSucursales = {} as ConsultaSucursales;

  constructor() { }

  ngOnInit(): void {
  }

}
