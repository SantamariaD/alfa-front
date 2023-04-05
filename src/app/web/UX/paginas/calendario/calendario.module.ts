import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './calendario.component';
import { CalendarioRoutingModule } from './calendario-routing.module';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';



@NgModule({
  declarations: [
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    CalendarioRoutingModule,
    SharedModule
  ],
  exports: [
    CalendarioComponent
  ]
})
export class CalendarioModule { }
