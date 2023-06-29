import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { ProductosRoutingModule } from './productos-routing.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { VentasComponent } from './secciones/ventas/ventas.component';
import { AnalisisComponent } from './secciones/analisis/analisis.component';


@NgModule({
  declarations: [
    VentasComponent,
    AnalisisComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductosRoutingModule,
    ComponentesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    VentasComponent,
    AnalisisComponent,
  ]
})
export class ProductosModule { }
