import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss'],
})
export class SucursalesComponent implements OnInit {
  /**
   * @variable secciones: Contiene las secciones de la página
   */
  secciones = [
    { texto: 'Información Sucursales', seleccionado: true },
    { texto: 'Stock Sucursales', seleccionado: false },
  ];

  /**
   * @variable seccion: Contiene la seccione actual
   */
  seccion = 'Información Sucursales';

  constructor() {}

  ngOnInit(): void {}

  /**
   * @Metodo Asigna la sección en la que nos encontramos
   */
  selectSeccion(seccion: string): void {
    this.seccion = seccion;
  }
}
