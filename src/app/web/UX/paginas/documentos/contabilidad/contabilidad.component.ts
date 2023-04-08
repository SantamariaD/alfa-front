import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.scss']
})
export class ContabilidadComponent implements OnInit {
  secciones = [
    { texto: 'Documentos de Contabilidad', seleccionado: true },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
