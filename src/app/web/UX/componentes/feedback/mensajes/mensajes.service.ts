import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class MensajesAdministrador {

  constructor(private mensaje: NzMessageService) { }

  ejecutarMensaje(evento: string, mensaje: string): void {
    this.mensaje.create(evento, mensaje);
  }
}
