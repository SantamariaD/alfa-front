import { Component, OnInit } from '@angular/core';
import {secciones} from './fixture'

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {

   /**
   * @variable secciones: Contiene la información del encabezado de la sección.
   */
   secciones = secciones;
   cabecera:string ='Administración';

  constructor() { }

  ngOnInit(): void {
  }

   //Metodo para seleccionar cabeceras
   sleccionarCabecera(cabecera:string){
    this.cabecera = cabecera;
    console.log(this.cabecera)
    }

}
