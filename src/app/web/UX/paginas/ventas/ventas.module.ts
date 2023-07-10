import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasRoutingModule } from './ventas-routing.module';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VentasComponent } from './ventas.component';
import { StockVentasModule } from '../productos-venta/productos-venta.module';
import { TicketComponent } from './componentes/ticket/ticket.component';
import { CardMetodoPagoComponent } from './componentes/card-metodo-pago/card-metodo-pago.component';

@NgModule({
  declarations: [VentasComponent, TicketComponent, CardMetodoPagoComponent],
  imports: [
    CommonModule,
    VentasRoutingModule,
    SharedModule,
    ComponentesModule,
    FormsModule,
    ReactiveFormsModule,
    StockVentasModule
  ],
})
export class VentasModule {}
