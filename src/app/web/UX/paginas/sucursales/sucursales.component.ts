import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss'],
})
export class SucursalesComponent implements OnInit {
  /**
   * @variable secciones: Contiene las secciones de la página
   */
  secciones = [
    { texto: 'Información Sucursales', seleccionado: true }
  ];

  /**
   * @variable seccion: Contiene la seccione actual
   */
  seccion = 'Información Sucursales';

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
      case 'Información Sucursales':
        this.router.navigate(['/sucursales/informacion']);
        break;
    }
  }

  /**
   * @Metodo Setea los tabs dependiendo la ruta
   */
  private seteoTabs(): void {
    const ruta = this.router.url;
    const seccion = ruta.split('/')[2];

    switch (seccion) {
      case 'informacion':
        this.secciones = [
          { texto: 'Información Sucursales', seleccionado: true }
        ];
        break;
    }
  }
}
