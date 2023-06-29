import { DatePipe } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { NZ_I18N, es_ES } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  Calendario,
  CalendarioGuardar,
  CalendarioRespuesta,
  LlaveValorCalendario,
} from 'src/app/web/informacion/interface/calendario';
import {
  HttpClientServiceInterface,
  HttpClientServiceInterfaceNoPayload,
} from 'src/app/web/informacion/interface/httpService';
import { CalendarioService } from 'src/app/web/informacion/servicios/calendario/calendario.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    { provide: LOCALE_ID, useValue: 'es' },
  ],
})
export class CalendarioComponent implements OnInit {
  /**
   * @Variable listDataMap: Contiene los eventos del calendario
   */
  listDataMap = {};

  /**
   * @Variable anoActual: Año actual de referencia para el calendario
   */
  anoActual = 0;

  /**
   * @Variable mesActual: Mes actual de referencia para el calendario
   */
  mesActual = 0;

  /**
   * @Variable mostrarCardCalendario: Muestra la card del calendario
   */
  mostrarCardCalendario = false;

  /**
   * @Variable mostrarAgregar: Muestra la card de agregar
   */
  mostrarAgregar = false;

  /**
   * @Variable isVisible: muestra modal eliminar
   */
  isVisible = false;

  /**
   * @Variable idEvento: id del evento
   */
  idEvento = 0;

  /**
   * @Variable eventosCalendario: Contiene la información de los eventos del calendario
   */
  eventosCalendario: LlaveValorCalendario = {} as LlaveValorCalendario;

  /**
   * @Variable secciones: Secciones de la cabecera
   */
  secciones = [{ texto: 'Mi Calendario', seleccionado: true }];
  clickCerrar: any;

  constructor(
    private calendarioService: CalendarioService,
    private message: NzMessageService
  ) {
    const fecha = new Date();
    this.anoActual = fecha.getFullYear();
    this.mesActual = fecha.getMonth() + 1;
  }

  ngOnInit(): void {
    this.consultarCalendarioUsuario(new Date().getFullYear());
  }

  /**
   * @Metodo metodo para diferenciar que cambio, fecha, mes o día
   */
  elementoSeleccionado(fecha: Date): void {
    if (this.anoActual !== fecha.getFullYear()) {
      this.anoActual = fecha.getFullYear();
      this.consultarCalendarioUsuario(this.anoActual);
    } else if (this.mesActual !== fecha.getMonth() + 1) {
      this.mesActual = fecha.getMonth() + 1;
    }
  }

  /**
   * @Metodo muestra el modal con los eventos guardados de ese día
   */
  clickFechaGuardada(item: LlaveValorCalendario): void {
    this.mostrarCardCalendario = true;
    this.eventosCalendario = {
      key: item.key,
      value: item.value.filter(
        (evento: Calendario) => evento.mes == this.mesActual
      ),
    };
  }

  /**
   * @Metodo cerrar modal
   */
  clickCerrarModal(): void {
    this.mostrarCardCalendario = false;
  }

  handleOk(): void {
    this.isVisible = false;
    this.eliminarEventoCalendario();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  /**
   * @Metodo Muestra el modal de eliminar
   */
  clickEliminarEvento(idEvento: number): void {
    this.idEvento = idEvento;
    this.mostrarCardCalendario = false;
    this.isVisible = true;
  }

  /**
   * @Metodo Muestra el modal de agrega
   */
  modalAgregar(): void {
    this.mostrarAgregar = true;
  }

  /**
   * @Metodo Oculta el modal de agrega
   */
  modalAgregarCerrar(): void {
    this.mostrarAgregar = false;
  }

  /**
   * @Metodo Solicita la peticion para guardar evento
   */
  clickGuardar(evento: CalendarioGuardar): void {
    this.calendarioService.crearEventoCalendario(evento).subscribe({
      next: (
        respuestaCrear: HttpClientServiceInterface<CalendarioRespuesta>
      ) => {
        this.mostrarAgregar = false;
        this.message.create('success', `Se guardo correctamente la tarea`);
        this.consultarCalendarioUsuario(new Date().getFullYear());
      },
    });
  }

  /**
   * @Metodo realiza la consulta de los eventos guardados del usuario
   */
  private consultarCalendarioUsuario(ano: number): void {
    const idUsuario = localStorage.getItem('id') || '';

    this.calendarioService.traerCalendarioUsuario(ano, idUsuario).subscribe({
      next: (respuestaConsulta: HttpClientServiceInterface<any>) =>
        (this.listDataMap = respuestaConsulta.payload),
      error: (error) => console.log(error),
    });
  }

  /**
   * @Metodo realiza la consulta para eliminar un evento del calendario
   */
  private eliminarEventoCalendario(): void {
    this.calendarioService.eliminarEventoCalendario(this.idEvento).subscribe({
      next: (respuestaElimar: HttpClientServiceInterfaceNoPayload) => {
        this.consultarCalendarioUsuario(new Date().getFullYear());
        this.message.create('success', `Se eliminó correctamente la tarea`);
      },
      error: (error) => console.log(error),
    });
  }
}
