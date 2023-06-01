import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionComponent } from './secciones/administracion/administracion.component';
import { ContabilidadComponent } from './secciones/contabilidad/contabilidad.component';
import { FiscalComponent } from './secciones/fiscal/fiscal.component';
import { SistemasComponent } from './secciones/sistemas/sistemas.component';
import { DocumentosRoutingModule } from './documentos-routing.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadosComponent } from './secciones/empleados/empleados.component';
import { DocumentosComponent } from './documentos.component';
import { CardDocumentosComponent } from './componentes/card-documentos/card-documentos.component';
import { EditarComponent } from './componentes/card-documentos/editar/editar/editar.component';
import { InformacionComponent } from './componentes/card-documentos/Informacion/informacion/informacion.component';
import { CrearComponent } from './componentes/crear/crear/crear.component';



@NgModule({
  declarations: [
    AdministracionComponent,
    ContabilidadComponent,
    FiscalComponent,
    SistemasComponent,
    EmpleadosComponent,
    DocumentosComponent,
    CardDocumentosComponent,
    EditarComponent,
    InformacionComponent,
    CrearComponent,
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
