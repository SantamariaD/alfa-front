import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-ventas',
  templateUrl: './stock-ventas.component.html',
  styleUrls: ['./stock-ventas.component.scss']
})
export class StockVentasComponent implements OnInit {
  /**
   * @variable secciones: Contiene las secciones de la página
   */
  secciones = [{ texto: 'Stock de ventas', seleccionado: true }];

  /**
   * @variable seccion: Contiene la seccione actual
   */
  seccion = 'Stock de ventas';

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * @Metodo Asigna la sección en la que nos encontramos
   */
  selectSeccion(seccion: string): void {
    this.seccion = seccion;
  }

}
