import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ClaveValor } from 'src/app/web/informacion/interface/catalogo-proveedores';

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
   * @Output nombreProveedor: manda el nombreProveedor al catalogo
   */
  @Output() nombreProveedor = new EventEmitter<string>();

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
  proveedoresArray: ClaveValor[] = [];

  constructor(private message: NzMessageService) {}

  ngOnInit(): void {
    // Formateo de array a usarse en el html
    this.proveedoresArray = Object.keys(this.productos).map((clave) => ({
      clave,
      idProveedor: this.productos[clave][0].idProveedor,
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

  eliminarSeccion(seccionNombre: string): void {
    this.secciones = this.secciones.filter(
      (seccion: { texto: string; seleccionado: boolean }) =>
        seccion.texto !== seccionNombre
    );
    if (this.secciones.length > 0 && this.secciones[0]?.texto) {
      this.secciones[0].seleccionado = true;
      this.seccion = this.secciones[0].texto;
    }
    
    this.message.success(`Se creo correctamente la orden de compra.`);
    this.nombreProveedor.emit(seccionNombre);
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
