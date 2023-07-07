import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  /**
   * @variable seccion: Contiene la seccione actual
   */
  seccion = '';

  /**
   * @variable secciones: Contiene las secciones de la página
   */
  secciones = [
    { texto: 'Ventas', seleccionado: true },
  ];

  constructor() {}

  ngOnInit(): void {
  }

  /**
   * @Metodo Asigna la sección en la que nos encontramos
   */
  selectSeccion(seccion: string): void {
    this.seccion = seccion;
  }
}
