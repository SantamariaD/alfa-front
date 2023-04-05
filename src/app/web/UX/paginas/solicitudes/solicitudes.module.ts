import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartasComponent } from './cartas/cartas.component';
import { ComprasComponent } from './compras/compras.component';
import { VacacionesComponent } from './vacaciones/vacaciones.component';
import { ViaticosComponent } from './viaticos/viaticos.component';
import { TicketsComponent } from './tickets/tickets.component';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';



@NgModule({
  declarations: [
    CartasComponent,
    ComprasComponent,
    VacacionesComponent,
    ViaticosComponent,
    TicketsComponent
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule
  ],
  exports: [
    CartasComponent,
    ComprasComponent,
    VacacionesComponent,
    ViaticosComponent,
    TicketsComponent
  ]
})
export class SolicitudesModule { }
