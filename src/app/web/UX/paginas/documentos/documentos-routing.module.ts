import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutasGuard } from 'src/app/web/informacion/guards/rutasGuard/rutas.guard';
import { AdministracionComponent } from './administracion/administracion.component';
import { ContabilidadComponent } from './contabilidad/contabilidad.component';
import { FiscalComponent } from './fiscal/fiscal.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { SistemasComponent } from './sistemas/sistemas.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'administracion',
        component: AdministracionComponent,
        canActivate: [RutasGuard],
      },
      {
        path: 'contabilidad',
        component: ContabilidadComponent,
        canActivate: [RutasGuard],
      },
      {
        path: 'fiscal',
        component: FiscalComponent,
        canActivate: [RutasGuard],
      },
      {
        path: 'sistemas',
        component: SistemasComponent,
        canActivate: [RutasGuard],
      },
      {
        path: 'plantilla',
        component: PlantillaComponent,
        canActivate: [RutasGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentosRoutingModule {}