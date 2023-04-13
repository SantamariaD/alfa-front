import { Injectable } from '@angular/core';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { HttpclientService } from '../httpService/http-service.service';
import { Store } from '@ngrx/store';
import { AppState, selectInfoUsuarioPeticion } from '../../state';
import { IndexableObject } from 'ng-zorro-antd/core/types';
import { UsuarioInterface } from '../../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class CambioContraseñaService {
  id!:number;
  contra!:string;

  constructor(private http:HttpclientService, private store:Store<AppState>) { }

  verificarContrasena(password:any){
    const url ='/perfil/confirmar-contrasena'

    this.store
      .select(selectInfoUsuarioPeticion)
      .subscribe(
        (usuarioResp: UsuarioInterface) => (this.id = usuarioResp.id)
      );
      
    const data = {
      id:this.id,
      contrasena: password.password
    }
   return this.http.post<any>(url,data );
  }

  actualizaContrasena(password:any,newPassword:any){
    const url ='/perfil/actualizar-contrasena'

    this.store
      .select(selectInfoUsuarioPeticion)
      .subscribe(
        (usuarioResp: UsuarioInterface) => (this.id = usuarioResp.id)
      );

    const data = {
      contrasena: password.password,
      id:this.id,
      contrasenaNueva:newPassword.password
    }
   return this.http.post<any>(url,data);
  }
}
