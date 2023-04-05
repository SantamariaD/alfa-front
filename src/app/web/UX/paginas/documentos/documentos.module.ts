import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionComponent } from './administracion/administracion.component';
import { ContabilidadComponent } from './contabilidad/contabilidad.component';
import { FiscalComponent } from './fiscal/fiscal.component';
import { SistemasComponent } from './sistemas/sistemas.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { DocumentosRoutingModule } from './documentos-routing.module';



@NgModule({
  declarations: [
    AdministracionComponent,
    ContabilidadComponent,
    FiscalComponent,
    SistemasComponent,
    PlantillaComponent
  ],
  imports: [
    CommonModule,
    DocumentosRoutingModule
  ],
  exports: [
    AdministracionComponent,
    ContabilidadComponent,
    FiscalComponent,
    SistemasComponent,
    PlantillaComponent
  ]
})
export class DocumentosModule { }
