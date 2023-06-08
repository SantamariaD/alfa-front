import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { ProductosRoutingModule } from './productos-routing.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ComprasComponent } from './secciones/compras/compras.component';
import { VentasComponent } from './secciones/ventas/ventas.component';
import { AnalisisComponent } from './secciones/analisis/analisis.component';


@NgModule({
  declarations: [
    ComprasComponent,
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
    ComprasComponent,
    VentasComponent,
    AnalisisComponent,
  ]
})
export class ProductosModule { }
