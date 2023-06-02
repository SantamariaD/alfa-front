import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/web/informacion/interface/productos';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  /**
   * @Input producto: Información del producto mostrado en la card
   */
  @Input() producto: Producto = {} as Producto;

  constructor() { }

  ngOnInit(): void {
  }

}
