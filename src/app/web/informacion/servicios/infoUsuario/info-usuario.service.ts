import { Injectable } from '@angular/core';
import {
  UsuarioInterface,
  infoUsuarioInterface,
} from '../../interface/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AppState, selectInfoUsuarioPeticion } from '../../state';
import { guardarInfoUsuario } from '../../state/infoUsuario/infoUsuario.action';
import { HttpclientService } from '../httpService/http-service.service';
import { guardarUsuario } from '../../state/usuario/usuario.action';

@Injectable({
  providedIn: 'root',
})
export class InfoUsuarioService {
  constructor(
    private http: HttpclientService,
    private store: Store<AppState>
  ) {}

  guardarInfo(usuario: UsuarioInterface) {
    const url = '/perfil/guardar-informacion';

    this.store
      .select(selectInfoUsuarioPeticion)
      .subscribe(
        (usuarioResp: UsuarioInterface) => (usuario.id = usuarioResp.id)
      );

      this.store.dispatch(
        guardarUsuario({ usuario: usuario })
      );

    this.http.post<infoUsuarioInterface>(url, usuario).subscribe((data) => {
      console.log(data);
    });
  }
}
