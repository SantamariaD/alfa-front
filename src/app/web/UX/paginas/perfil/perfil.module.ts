import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { SharedModule } from '../../../informacion/utils/shared.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { DomicilioFormComponent } from './templates/domicilio-form/domicilio-form.component';
import { UsuarioFormComponent } from './templates/usuario-form/usuario-form.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PerfilComponent, DomicilioFormComponent, UsuarioFormComponent],
  imports: [CommonModule, PerfilRoutingModule,SharedModule,ComponentesModule,FormsModule,ReactiveFormsModule],
})
export class PerfilModule {}
