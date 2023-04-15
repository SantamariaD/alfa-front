import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { NZ_I18N, es_ES } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
  providers: [{ provide: NZ_I18N, useValue: es_ES },{ provide: LOCALE_ID, useValue: 'es' },]
})

export class CalendarioComponent implements OnInit {
  listDataMap = {
    eight: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
    ],
    ten: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'error', content: 'This is error event.' },
    ],
    twenty: [
      { type: 'warning', content: 'This is warning event' },
      { type: 'success', content: 'This is very long usual event........' },
      { type: 'error', content: 'This is error event 1.' },
      { type: 'error', content: 'This is error event 2.' },
      { type: 'error', content: 'This is error event 3.' },
      { type: 'error', content: 'This is error event 4.' },
    ],
  };

  secciones = [
    { texto: 'Calendario', seleccionado: true },
  ];

  constructor() {}

  ngOnInit(): void {
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
}
