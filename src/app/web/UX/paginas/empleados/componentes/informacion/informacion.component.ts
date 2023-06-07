import { Component, Input, OnInit } from '@angular/core';
import { Empleados } from 'src/app/web/informacion/interface/empleados';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {
  /**
   * @Input empleado: contiene la info del empleado seleccionado
   */
@Input() empleado:Empleados = {} as Empleados;

  constructor() { }

  ngOnInit(): void {
  }

}
