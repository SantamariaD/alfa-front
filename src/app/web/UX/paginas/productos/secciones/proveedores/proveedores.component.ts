import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnaTabla } from 'src/app/web/informacion/interface/tabla';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
})
export class ProveedoresComponent implements OnInit {
  /**
   * @variable seccion: Contiene la seccione actual
   */
  seccion = 'Información de proveedores';

  /**
   * @variable secciones: Contiene las secciones de la página
   */
  secciones = [
    { texto: 'Información', seleccionado: true },
    { texto: 'Catálogo', seleccionado: false },
    { texto: 'Historial', seleccionado: false },
    { texto: 'Análisis', seleccionado: false },
  ];

  /**
   * @variable columnasTabla: Columnas que contiene la tabla
   */
  columnasTabla: Array<ColumnaTabla> = [
    { columna: 'Nombre', llave: 'nombre', busqueda: true },
    { columna: 'SKU', llave: 'sku', busqueda: true },
    { columna: 'Categoría', llave: 'categoria', busqueda: true },
    { columna: 'Precio de venta', llave: 'precioVenta', busqueda: true },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * @Metodo Asigna la sección en la que nos encontramos
   */
  selectSeccion(seccion: string): void {
    this.seccion = seccion;
    switch (seccion) {
      case 'Información':
        this.router.navigate(['/productos/proveedores/informacion']);
        break;
      case 'Catálogo':
        this.router.navigate(['/productos/proveedores/catalogo']);
        break;
      case 'Historial':
        this.router.navigate(['/productos/proveedores/historial']);
        break;
      case 'Análisis':
        //this.router.navigate(['/home']);
        break;

      default:
        break;
    }
  }
}
