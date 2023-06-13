import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentosRoutingModule } from './documentos-routing.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentosComponent } from './documentos.component';
import { CardDocumentosComponent } from './componentes/card-documentos/card-documentos.component';
import { EditarComponent } from './componentes/card-documentos/editar/editar.component';
import { InformacionComponent } from './componentes/card-documentos/informacion/informacion.component';
import { EliminarComponent } from './componentes/card-documentos/eliminar/eliminar.component';
import { AgregarComponent } from './componentes/agregar/agregar.component';

@NgModule({
  declarations: [
    DocumentosComponent,
    CardDocumentosComponent,
    EditarComponent,
    InformacionComponent,
    EliminarComponent,
    AgregarComponent,
  ],
  imports: [
    CommonModule,
    DocumentosRoutingModule,
    ComponentesModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DocumentosModule {}
