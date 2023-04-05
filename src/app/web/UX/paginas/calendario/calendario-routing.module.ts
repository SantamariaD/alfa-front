import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutasGuard } from 'src/app/web/informacion/guards/rutasGuard/rutas.guard';
import { CalendarioComponent } from './calendario.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CalendarioComponent,
        canActivate: [RutasGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioRoutingModule {}
