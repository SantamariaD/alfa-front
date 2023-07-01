import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockVentasComponent } from './stock-ventas.component';
import { StockVentaRoutingModule } from './stock-venta-routing.module';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StockVentasComponent],
  imports: [
    CommonModule,
    StockVentaRoutingModule,
    SharedModule,
    ComponentesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class StockVentasModule {}
