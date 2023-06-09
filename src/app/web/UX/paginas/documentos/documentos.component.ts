import { Component, OnInit } from '@angular/core';
import { secciones } from './fixture';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss'],
})
export class DocumentosComponent implements OnInit {
  /**
   * @variable secciones: Contiene la información del encabezado de la sección.
   */
  secciones = secciones;
  cabecera: string = 'Tabla de Documentos';

  /**
   * @variable secciones: Contiene la información del encabezado de la sección.
   */
  docCreado = false;

  constructor() {}

  ngOnInit(): void {}

  actualizaDatos(actualiza: boolean) {
    this.docCreado = actualiza;
  }

  //Metodo para seleccionar cabeceras
  selectSeccion(cabecera: string) {
    this.cabecera = cabecera;
  }
}
