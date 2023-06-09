import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/web/informacion/interface/productos';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {
  /**
   * @Input producto: Información del producto mostrado en la card
   */
  @Input() producto: Producto = {} as Producto;

  constructor() { }

  ngOnInit(): void {
    
  }

}
