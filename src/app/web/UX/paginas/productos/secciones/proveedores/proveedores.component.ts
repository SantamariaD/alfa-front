import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
})
export class ProveedoresComponent implements OnInit {
  /**
   * @variable seccion: Contiene la seccione actual
   */
  seccion = '';

  /**
   * @variable secciones: Contiene las secciones de la página
   */
  secciones = [
    { texto: 'Información de proveedores', seleccionado: true },
    { texto: 'Historial de compras', seleccionado: false },
    { texto: 'Catálogo de proveedores', seleccionado: false },
    { texto: 'Carrito', seleccionado: false },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.seteoTabs();
  }

  /**
   * @Metodo Asigna la sección en la que nos encontramos
   */
  selectSeccion(seccion: string): void {
    this.seccion = seccion;
    switch (seccion) {
      case 'Información de proveedores':
        this.router.navigate(['/productos/proveedores/informacion']);
        break;
      case 'Catálogo de proveedores':
        this.router.navigate(['/productos/proveedores/catalogo']);
        break;
      case 'Historial de compras':
        this.router.navigate(['/productos/proveedores/historial']);
        break;
      case 'Carrito':
        this.router.navigate(['/productos/proveedores/carrito']);
        break;
    }
  }

  /**
   * @Metodo Setea los tabs dependiendo la ruta
   */
  private seteoTabs(): void {
    const ruta = this.router.url;
    const seccion = ruta.split('/')[3];

    switch (seccion) {
      case 'informacion':
        this.secciones = [
          { texto: 'Información de proveedores', seleccionado: true },
          { texto: 'Historial de compras', seleccionado: false },
          { texto: 'Catálogo de proveedores', seleccionado: false },
          { texto: 'Carrito', seleccionado: false },
        ]
        break;
      case 'historial':
        this.secciones = [
          { texto: 'Información de proveedores', seleccionado: false },
          { texto: 'Historial de compras', seleccionado: true },
          { texto: 'Catálogo de proveedores', seleccionado: false },
          { texto: 'Carrito', seleccionado: false },
        ]
        break;
      case 'catalogo':
        this.secciones = [
          { texto: 'Información de proveedores', seleccionado: false },
          { texto: 'Historial de compras', seleccionado: false },
          { texto: 'Catálogo de proveedores', seleccionado: true },
          { texto: 'Carrito', seleccionado: false },
        ]
        break;
      case 'carrito':
        this.secciones = [
          { texto: 'Información de proveedores', seleccionado: false },
          { texto: 'Historial de compras', seleccionado: false },
          { texto: 'Catálogo de proveedores', seleccionado: false },
          { texto: 'Carrito', seleccionado: true },
        ]
        break;
    }
  }
}
