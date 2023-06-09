import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutasGuard } from 'src/app/web/informacion/guards/rutasGuard/rutas.guard';
import { DocumentosComponent } from './documentos.component';


const routes: Routes = [
  {
    path: '',
    component: DocumentosComponent,
    canActivate: [RutasGuard],
}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentosRoutingModule {}