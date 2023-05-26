import { Component, OnInit } from '@angular/core';
import {secciones} from './fixture'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  /**
   * @variable secciones: Contiene las secciones de la página
   */
  secciones = secciones;
  cabecera:string ='Lista de productos';

  constructor() { }

  ngOnInit(): void {
  }

  seleccionarCabecera(cabecera:string){
  this.cabecera = cabecera;
  }

}
