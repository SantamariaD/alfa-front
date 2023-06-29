import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LlaveValorCalendario } from 'src/app/web/informacion/interface/calendario';

@Component({
  selector: 'app-card-calendario',
  templateUrl: './card-calendario.component.html',
  styleUrls: ['./card-calendario.component.scss'],
})
export class CardCalendarioComponent implements OnInit {
  /**
   * @Input eventosCalendario: Contiene la información de los eventos del calendario
   */
  @Input() eventosCalendario: LlaveValorCalendario = {} as LlaveValorCalendario;

  /**
   * @Output clickCerrar: manda el evento al dar click sobre el icono X
   */
  @Output() clickCerrar = new EventEmitter<any>();

  /**
   * @Output clickEliminarEvento: manda el evento al dar click sobre el icono X
   */
  @Output() clickEliminarEvento = new EventEmitter<any>();

  /**
   * @Variable seccionModal: Controla la sección que se muestra en el modal
   */
  seccionModal = 'informacion';

  /**
   * @Variable editarEvento: Permite editar el evento
   */
  editarEvento = false;

  /**
   * @Variable mostrarEvento: Muestra la información del evento
   */
  mostrarEvento = true;

  /**
   * @Variable eliminarEvento: Permite eliminar el evento
   */
  eliminarEvento = false;

  /**
   * @Formulario contenidoForm: Contenido del evento
   */
  contenidoForm: FormControl = new FormControl('');

  /**
   * @Formulario tipoForm: tipo del evento
   */
  tipoForm: FormControl = new FormControl('');

  /**
   * @Variable tipoEvento: relacion en tipo de evento
   */
  tipoEvento = {
    success: 'Prioridad baja',
    warning: 'Prioridad media',
    error: 'Prioridad alta',
  };

  constructor() {}

  ngOnInit(): void {}

  /**
   * @Metodo cerrar modal
   */
  clickCerrarModal(): void {
    this.clickCerrar.emit(false);
  }

  /**
   * @Metodo cambia a la seccion informacion
   */
  clickInformacion(): void {
    this.seccionModal = 'informacion';
    this.mostrarEvento = true;
    this.eliminarEvento = false;
  }

  /**
   * @Metodo cambia a la seccion eliminar
   */
  clickEliminar(): void {
    this.seccionModal = 'eliminar';
    this.mostrarEvento = false;
    this.eliminarEvento = true;
  }

  /**
   * @Metodo Muestra el modal para confirmar la eliminación del evento
   */
  eliminarEventoCalendario(id: number): void {
    this.clickEliminarEvento.emit(id);
  }
}
