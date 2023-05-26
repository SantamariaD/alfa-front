import { Component, OnInit } from '@angular/core';
import {secciones} from './fixture'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  /**
   * @variable seccion: Contiene la seccione actual
   */
  seccion = 'Gestión de productos';

  /**
   * @variable secciones: Contiene las secciones de la página
   */
  secciones = [
    { texto: 'Gestión de productos', seleccionado: true },
    { texto: 'Gestión de proveedores', seleccionado: false },
    { texto: 'Gestión de compras', seleccionado: false },
    { texto: 'Gestión de ventas', seleccionado: false },
    { texto: 'Informes y análisis', seleccionado: false },
  ];

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
