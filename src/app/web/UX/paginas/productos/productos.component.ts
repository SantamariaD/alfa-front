import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {secciones} from './fixture'
import { NzModalService } from 'ng-zorro-antd/modal';
declare const $: any;

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
  producto:any;
  isVisible:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  seleccionarCabecera(cabecera:string){
  this.cabecera = cabecera;
  }

  traerFila(producto:any){
    this.producto = producto

    const modal:any = document.getElementById('ModalProducto');
    modal.classList.add('active');

  }

  

  
}
