import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { ProductosComponent } from './productos.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
import { FormularioProductosComponent } from './formulario-productos/formulario-productos.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProveedoresComponent } from './secciones/proveedores/proveedores.component';
import { ComprasComponent } from './secciones/compras/compras.component';
import { VentasComponent } from './secciones/ventas/ventas.component';
import { AnalisisComponent } from './secciones/analisis/analisis.component';
import { StockComponent } from './secciones/stock/stock.component';



@NgModule({
  declarations: [
    ProductosComponent,
    TarjetasComponent,
    FormularioProductosComponent,
    
    ProveedoresComponent,
    ComprasComponent,
    VentasComponent,
    AnalisisComponent,
    StockComponent
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
    ProductosComponent,
    ProveedoresComponent,
    ComprasComponent,
    VentasComponent,
    AnalisisComponent,
    StockComponent
  ]
})
export class ProductosModule { }
