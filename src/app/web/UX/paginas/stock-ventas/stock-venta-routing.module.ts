import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockVentasComponent } from './stock-ventas.component';

const routes: Routes = [
  { path: '', component: StockVentasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockVentaRoutingModule { }