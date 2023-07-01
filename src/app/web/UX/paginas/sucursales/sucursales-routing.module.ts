import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SucursalesComponent } from './sucursales.component';
import { InformacionSucursalesComponent } from './informacion-sucursales/informacion-sucursales.component';

const routes: Routes = [
  {
    path: '',
    component: SucursalesComponent,
    children: [
      { path: 'informacion', component: InformacionSucursalesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SucursalesRoutingModule {}
