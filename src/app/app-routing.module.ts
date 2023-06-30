import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './web/informacion/guards/loginGuard/login.guard';
import { RutasGuard } from './web/informacion/guards/rutasGuard/rutas.guard';
import { LoginComponent } from './web/UX/paginas/login/login.component';
import { PaginaErrorComponent } from './web/UX/paginas/pagina-error/pagina-error.component';
import { RegistroComponent } from './web/UX/paginas/registro/registro.component';
import { CalendarioComponent } from './web/UX/paginas/calendario/calendario.component';
import { EmpleadosModule } from './web/UX/paginas/empleados/empleados.module';

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
    component: CalendarioComponent,
  },
  {
    path: 'documentos',
    loadChildren: () =>
      import('./web/UX/paginas/documentos/documentos.module').then(
        (m) => m.DocumentosModule
      ),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./web/UX/paginas/perfil/perfil.module').then(
        (m) => m.PerfilModule
      ),
  },
  {
    path: 'stock',
    loadChildren: () =>
      import('./web/UX/paginas/stock/stock.module').then(
        (m) => m.StockModule
      ),
  },
  {
    path: 'proveedores',
    loadChildren: () =>
      import('./web/UX/paginas/proveedores/proveedores.module').then(
        (m) => m.ProveedoresModule
      ),
  },
  {
    path: 'analisis',
    loadChildren: () =>
      import('./web/UX/paginas/analisis/analisis.module').then(
        (m) => m.AnalisisModule
      ),
  },
  {
    path: 'ventas',
    loadChildren: () =>
      import('./web/UX/paginas/ventas/ventas.module').then(
        (m) => m.VentasModule
      ),
  },
  {
    path: 'empleados',
    loadChildren: () =>
      import('./web/UX/paginas/empleados/empleados.module').then(
        (m) => m.EmpleadosModule
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
