import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresComponent } from './proveedores.component';
import { InformacionProveedoresComponent } from './secciones/informacion/informacion.component';
import { CatalogoComponent } from './secciones/catalogo/catalogo.component';
import { HistorialComponent } from './secciones/historial/historial.component';

const routes: Routes = [
  {
    path: '',
    component: ProveedoresComponent,
    children: [
      { path: 'informacion', component: InformacionProveedoresComponent },
      { path: 'catalogo', component: CatalogoComponent },
      { path: 'historial', component: HistorialComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProveedoresRoutingModule {}
