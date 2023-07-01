import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucursalesComponent } from './sucursales.component';
import { SucursalesRoutingModule } from './sucursales-routing.module';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardSucursalesComponent } from './componentes/card-sucursales/card-sucursales.component';
import { AgregarSucursalesComponent } from './componentes/agregar-sucursales/agregar-sucursales.component';
import { EditarComponent } from './componentes/card-sucursales/editar/editar.component';
import { EliminarComponent } from './componentes/card-sucursales/eliminar/eliminar.component';
import { InformacionComponent } from './componentes/card-sucursales/informacion/informacion.component';
import { InformacionSucursalesComponent } from './informacion-sucursales/informacion-sucursales.component';



@NgModule({
  declarations: [
    SucursalesComponent,
    CardSucursalesComponent,
    AgregarSucursalesComponent,
    EditarComponent,
    EliminarComponent,
    InformacionComponent,
    InformacionSucursalesComponent
  ],
  imports: [
    CommonModule,
    SucursalesRoutingModule,
    SharedModule,
    ComponentesModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SucursalesModule { }
