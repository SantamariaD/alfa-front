import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosComponent } from './empleados.component';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from '../../componentes/componentes.module';
import { DocumentosComponent } from './secciones/documentos/documentos.component';
import { TablaEmpleadosComponent } from './secciones/tablaEmpleados/tablaEmpleados.component';
import { SolicitudesComponent } from './secciones/solicitudes/solicitudes.component';
import { ModalEditarComponent } from './componentes/modal-editar/modal-editar.component';
import { ModalCrearComponent } from './componentes/modal-crear/modal-crear.component';
import { CardEmpleadosComponent } from './componentes/card-empleados/card-empleados.component';
import { InformacionComponent } from './componentes/informacion/informacion.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';



@NgModule({
  declarations: [
    EmpleadosComponent,
    DocumentosComponent,
    TablaEmpleadosComponent,
    SolicitudesComponent,
    ModalEditarComponent,
    ModalCrearComponent,
    CardEmpleadosComponent,
    InformacionComponent,
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentesModule,
    NzToolTipModule
  ]
})
export class EmpleadosModule { }
