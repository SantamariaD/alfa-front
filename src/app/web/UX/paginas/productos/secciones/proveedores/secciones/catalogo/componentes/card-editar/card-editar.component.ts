import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-editar',
  templateUrl: './card-editar.component.html',
  styleUrls: ['./card-editar.component.scss']
})
export class CardEditarComponent implements OnInit {
  /**
   * @Input mostrarCardEditar: Controla si se muestra o no la card
   */
  @Input() mostrarCardEditar = false;

  /**
   * @Output clickCerrar: manda el evento al dar click sobre el icono X
   */
  @Output() clickCerrar = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * @Metodo cerrar modal
   */
  clickCerrarModal(): void {
    this.clickCerrar.emit(false);
  }

}
