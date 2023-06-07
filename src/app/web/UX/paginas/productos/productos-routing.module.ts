import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './secciones/stock/stock.component';
import { ProveedoresComponent } from './secciones/proveedores/proveedores.component';
import { ComprasComponent } from './secciones/compras/compras.component';
import { VentasComponent } from './secciones/ventas/ventas.component';
import { AnalisisComponent } from './secciones/analisis/analisis.component';

const routes: Routes = [
  { path: 'stock', component: StockComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'analisis', component: AnalisisComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }