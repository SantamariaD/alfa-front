import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { ProductosComponent } from './productos.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
import { FormularioProductosComponent } from './formulario-productos/formulario-productos.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductosComponent,
    TarjetasComponent,
    FormularioProductosComponent,
    
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
    ProductosComponent
  ]
})
export class ProductosModule { }
