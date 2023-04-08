import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./plantilla.component.scss']
})
export class PlantillaComponent implements OnInit {
  secciones = [
    { texto: 'Documentos de Plantilla', seleccionado: true },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
