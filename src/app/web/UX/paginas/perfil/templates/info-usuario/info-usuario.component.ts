import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsuarioInterface, infoUsuarioInterface } from 'src/app/web/informacion/interface/usuario';
import { AppState, selectInfoUsuarioPeticion } from 'src/app/web/informacion/state';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.scss']
})
export class InfoUsuarioComponent implements OnInit {

usuario:any;

  constructor(private store:Store<AppState>) { }


  ngOnInit(): void {
    this.store
    .select(selectInfoUsuarioPeticion)
    .subscribe(
      (usuarioResp: UsuarioInterface) => (this.usuario = usuarioResp)
    );
    
  }

  

}
