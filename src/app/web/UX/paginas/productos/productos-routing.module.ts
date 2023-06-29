import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './secciones/ventas/ventas.component';
import { AnalisisComponent } from './secciones/analisis/analisis.component';

const routes: Routes = [
  {
    path: 'stock',
    loadChildren: () =>
      import('./secciones/stock/stock.module').then((m) => m.StockModule),
  },
  {
    path: 'proveedores',
    loadChildren: () =>
      import('./secciones/proveedores/proveedores.module').then(
        (m) => m.ProveedoresModule
      ),
  },
  { path: 'ventas', component: VentasComponent },
  { path: 'analisis', component: AnalisisComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosRoutingModule {}
