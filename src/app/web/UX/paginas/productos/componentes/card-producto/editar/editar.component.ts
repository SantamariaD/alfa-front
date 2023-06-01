import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/web/informacion/interface/productos';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  /**
   * @Input producto: Información del producto mostrado en la card
   */
  @Input() producto: Producto = {} as Producto;

  constructor() { }

  ngOnInit(): void {
  }

}
