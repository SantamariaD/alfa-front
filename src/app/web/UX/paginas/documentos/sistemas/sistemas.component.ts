import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sistemas',
  templateUrl: './sistemas.component.html',
  styleUrls: ['./sistemas.component.scss']
})
export class SistemasComponent implements OnInit {
  secciones = [
    { texto: 'Documentos de Sistemas', seleccionado: true },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
