import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { ComponentesModule } from 'src/app/web/UX/componentes/componentes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresComponent } from './proveedores.component';
import { InformacionProveedoresComponent } from './secciones/informacion/informacion.component';
import { CatalogoComponent } from './secciones/catalogo/catalogo.component';
import { HistorialComponent } from './secciones/historial/historial.component';

@NgModule({
  declarations: [
    ProveedoresComponent,
    InformacionProveedoresComponent,
    CatalogoComponent,
    HistorialComponent,
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    SharedModule,
    ComponentesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProveedoresComponent,
    InformacionProveedoresComponent,
    CatalogoComponent,
    HistorialComponent,
  ]
})
export class ProveedoresModule {}
