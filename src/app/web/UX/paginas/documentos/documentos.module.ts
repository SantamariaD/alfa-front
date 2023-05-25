import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionComponent } from './administracion/administracion.component';
import { ContabilidadComponent } from './contabilidad/contabilidad.component';
import { FiscalComponent } from './fiscal/fiscal.component';
import { SistemasComponent } from './sistemas/sistemas.component';
import { DocumentosRoutingModule } from './documentos-routing.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadosComponent } from './empleados/empleados.component';



@NgModule({
  declarations: [
    AdministracionComponent,
    ContabilidadComponent,
    FiscalComponent,
    SistemasComponent,
    EmpleadosComponent,
  ],
  imports: [
    CommonModule,
    DocumentosRoutingModule,
    ComponentesModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AdministracionComponent,
    ContabilidadComponent,
    FiscalComponent,
    SistemasComponent,
  ]
})
export class DocumentosModule { }
