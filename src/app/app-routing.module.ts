import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './web/informacion/guards/loginGuard/login.guard';
import { RutasGuard } from './web/informacion/guards/rutasGuard/rutas.guard';
import { LoginComponent } from './web/UX/paginas/login/login.component';
import { PaginaErrorComponent } from './web/UX/paginas/pagina-error/pagina-error.component';
import { RegistroComponent } from './web/UX/paginas/registro/registro.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'home',
    loadChildren: () =>
      import('./web/UX/paginas/home/home.module').then((m) => m.HomeModule),
    canActivate: [RutasGuard],
  },
  {
    path: 'calendario',
    loadChildren: () =>
      import('./web/UX/paginas/calendario/calendario.module').then(
        (m) => m.CalendarioModule
      ),
  },
  {
    path: 'documentos',
    loadChildren: () =>
      import('./web/UX/paginas/documentos/documentos.module').then(
        (m) => m.DocumentosModule
      ),
  },
  {
    path: 'solicitudes',
    loadChildren: () =>
      import('./web/UX/paginas/solicitudes/solicitudes.module').then(
        (m) => m.SolicitudesModule
      ),
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistroComponent },
  {
    path: '**',
    component: PaginaErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
