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
    { texto: 'Información de proveedores', seleccionado: true },
    { texto: 'Catálogo de productos', seleccionado: false },
    { texto: 'Historial de pedidos', seleccionado: false },
    { texto: 'Análisis', seleccionado: false },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * @Metodo Asigna la sección en la que nos encontramos
   */
  selectSeccion(seccion: string): void {
    this.seccion = seccion;
    switch (seccion) {
      case 'Información de proveedores':
        this.router.navigate(['/productos/proveedores/informacion']);
        break;
      case 'Catálogo de productos':
        this.router.navigate(['/productos/proveedores/catalogo']);
        break;
      case 'Historial de pedidos':
        this.router.navigate(['/productos/proveedores/historial']);
        break;
      case 'Análisis':
        //this.router.navigate(['/home']);
        break;
    }
  }
}
