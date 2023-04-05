import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutasGuard } from 'src/app/web/informacion/guards/rutasGuard/rutas.guard';
import { CartasComponent } from './cartas/cartas.component';
import { ComprasComponent } from './compras/compras.component';
import { TicketsComponent } from './tickets/tickets.component';
import { VacacionesComponent } from './vacaciones/vacaciones.component';
import { ViaticosComponent } from './viaticos/viaticos.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cartas',
        component: CartasComponent,
        canActivate: [RutasGuard],
      },
      {
        path: 'compras',
        component: ComprasComponent,
        canActivate: [RutasGuard],
      },
      {
        path: 'tickets',
        component: TicketsComponent,
        canActivate: [RutasGuard],
      },
      {
        path: 'vacaciones',
        component: VacacionesComponent,
        canActivate: [RutasGuard],
      },
      {
        path: 'viaticos',
        component: ViaticosComponent,
        canActivate: [RutasGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesRoutingModule {}