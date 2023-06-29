import { DatePipe } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { NZ_I18N, es_ES } from 'ng-zorro-antd/i18n';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
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
  listDataMap = {};

  secciones = [{ texto: 'Calendario', seleccionado: true }];

  constructor(private calendarioService: CalendarioService) {}

  ngOnInit(): void {
    this.consultarCalendarioUsuario();
  }

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 4) {
      return 2023;
    }
    return null;
  }

  diaSeleccionado(dia: any): void {
    console.log(dia);
  }

  clickFechaGuardada(item: any): void {
    console.log(item);
  }

  private consultarCalendarioUsuario(): void {
    this.calendarioService.traerCalendarioUsuario().subscribe({
      next: (respuestaConsulta: HttpClientServiceInterface<any>) =>
        (this.listDataMap = respuestaConsulta.payload),
    });
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss') || '';
  }
}
