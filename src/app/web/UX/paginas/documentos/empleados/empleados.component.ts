import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  secciones = [
    { texto: 'Documentos de Empleados', seleccionado: true },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
