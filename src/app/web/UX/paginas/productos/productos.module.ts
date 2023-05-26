import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { ProductosComponent } from './productos.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { TarjetasComponent } from './tarjetas/tarjetas.component';



@NgModule({
  declarations: [
    ProductosComponent,
    TarjetasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductosRoutingModule,
    ComponentesModule
  ],
  exports: [
    ProductosComponent
  ]
})
export class ProductosModule { }
