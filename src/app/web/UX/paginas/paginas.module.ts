import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { CardCalendarioComponent } from './calendario/componentes/card-calendario/card-calendario.component';
import { CardAgregarComponent } from './calendario/componentes/card-agregar/card-agregar.component';


@NgModule({
  declarations: [LoginComponent, RegistroComponent, CalendarioComponent, CardCalendarioComponent, CardAgregarComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentesModule,
  ],
  exports: [LoginComponent, CalendarioComponent, RegistroComponent],
})
export class PaginasModule {}
