import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CatalogoProveedor } from 'src/app/web/informacion/interface/catalogo-proveedores';

@Component({
  selector: 'app-card-orden-compra',
  templateUrl: './card-orden-compra.component.html',
  styleUrls: ['./card-orden-compra.component.scss']
})
export class CardOrdenCompraComponent implements OnInit {
  /**
   * @Input productos: productos a comprar
   */
  @Input() productos: any;

  /**
   * @Output clickCerrar: manda el evento al dar click sobre el icono X
   */
  @Output() clickCerrar = new EventEmitter<any>();

  /**
   * @Varible subtotal: subtotal de la compra
   */
  subtotal = 0;

  proveedoresArray: { clave: string, valor: any }[] = [];

  constructor() { }

  ngOnInit(): void {
    this.proveedoresArray = Object.keys(this.productos).map(clave => ({
      clave,
      valor: this.productos[clave]
    }));
  }

  /**
   * @Metodo cerrar modal
   */
  clickCerrarModal(): void {
    this.clickCerrar.emit(false);
  }

}
