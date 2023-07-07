import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasRoutingModule } from './ventas-routing.module';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VentasComponent } from './ventas.component';

@NgModule({
  declarations: [VentasComponent],
  imports: [
    CommonModule,
    VentasRoutingModule,
    SharedModule,
    ComponentesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class VentasModule {}
