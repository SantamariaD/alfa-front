import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosVentaComponent } from './productos-venta.component';

const routes: Routes = [
  { path: '', component: ProductosVentaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockVentaRoutingModule { }