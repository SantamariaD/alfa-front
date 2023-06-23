import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-orden-compra',
  templateUrl: './card-orden-compra.component.html',
  styleUrls: ['./card-orden-compra.component.scss'],
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
   * @variable seccion: Contiene la seccione actual
   */
  seccion = '';

  /**
   * @variable secciones: Contiene las secciones de la página
   */
  secciones: { texto: string; seleccionado: boolean }[] = [];

  /**
   * @variable proveedoresArray: formato del array para usar
   */
  proveedoresArray: { clave: string; valor: any }[] = [];

  constructor() {}

  ngOnInit(): void {
    // Formateo de array a usarse en el html
    this.proveedoresArray = Object.keys(this.productos).map((clave) => ({
      clave,
      valor: this.productos[clave],
    }));

    // Seteo de cabeceras a mostrar
    this.proveedoresArray.forEach(
      (proveedor: { clave: string; valor: any }, index) => {
        this.secciones.push({
          texto: proveedor.clave,
          seleccionado: index == 0,
        });

        if (index == 0) {
          this.seccion = proveedor.clave;
        }
      }
    );
  }

  /**
   * @Metodo cerrar modal
   */
  clickCerrarModal(): void {
    this.clickCerrar.emit(false);
  }

  /**
   * @Metodo Asigna la sección en la que nos encontramos
   */
  selectSeccion(seccion: string): void {
    this.seccion = seccion;
  }
}
