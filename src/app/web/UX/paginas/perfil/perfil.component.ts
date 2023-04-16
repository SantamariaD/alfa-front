import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomicilioFormComponent } from './templates/domicilio-form/domicilio-form.component';
import { EventEmitter } from 'stream';
import { InfoUsuarioService } from 'src/app/web/informacion/servicios/infoUsuario/info-usuario.service';
import { UsuarioInterface } from 'src/app/web/informacion/interface/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss','./templates/domicilio-form/domicilio-form.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario!:UsuarioInterface;
estado:string ='Información general';
  estados: string[] = ['ocupado', 'activo', 'ausente'];
  openModal: boolean = false;
  claseStatus: string = 'check-circle';
  colorStatus: string = '#7FFF00';
  isVisible:boolean = false;
  pantalla:string='';

    secciones = [
    { texto: 'Información General', seleccionado: true },
    { texto: 'Seguridad', seleccionado: false },
    { texto: 'Acciones', seleccionado: false }
  ];

  constructor(private http:HttpClient, private servicio:InfoUsuarioService) {}

  ngOnInit(): void {
    
  }

  selccionar() {
    this.openModal = !this.openModal;
  }

  cambioStatus(status: string) {
    switch (status) {
      case 'En línea':
        return (
          (this.claseStatus = 'check-circle'), (this.colorStatus = '#7FFF00')
        );

      case 'Ausente':
        return (
          (this.claseStatus = 'clock-circle'), (this.colorStatus = '#FFA500')
        );

      case 'No molestar':
        return (
          (this.claseStatus = 'info-circle'), (this.colorStatus = '#FF0000')
        );

      case 'Desconectado':
        return (
          (this.claseStatus = 'minus-circle'), (this.colorStatus = '#C0C0C0')
        );

      default:
        return this.claseStatus, this.colorStatus;
    }
  }


  seleccionado(value:string){
    if(value === 'Información General' ){
      this.estado ='Información general'
    }else if(value === 'Seguridad'){
      this.estado ='seguridad'
    }else{
      this.estado = 'acciones'
    }
    
    
  }

  editInfo(){
    this.isVisible = !this.isVisible
  }

  recibeEnviarForm(data:any){
    this.usuario = data;
console.log(this.usuario);
  }

  enviar(){
this.servicio.guardarInfo(this.usuario);
  }

}
