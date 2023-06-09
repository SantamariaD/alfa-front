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
import { CardProveedorComponent } from './secciones/informacion/componentes/card-proveedor/card-proveedor.component';
import { EditarComponent } from './secciones/informacion/componentes/card-proveedor/editar/editar.component';
import { EliminarComponent } from './secciones/informacion/componentes/card-proveedor/eliminar/eliminar.component';
import { InformacionComponent } from './secciones/informacion/componentes/card-proveedor/informacion/informacion.component';
import { AgregarProveedorComponent } from './secciones/informacion/componentes/agregar-proveedor/agregar-proveedor.component';
import { CardEditarComponent } from './secciones/catalogo/componentes/card-editar/card-editar.component';

@NgModule({
  declarations: [
    ProveedoresComponent,
    InformacionProveedoresComponent,
    CatalogoComponent,
    HistorialComponent,
    CardProveedorComponent,
    EditarComponent,
    EliminarComponent,
    InformacionComponent,
    AgregarProveedorComponent,
    CardEditarComponent,
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
    CardProveedorComponent,
    EditarComponent,
    EliminarComponent,
    InformacionComponent,
    AgregarProveedorComponent,
  ]
})
export class ProveedoresModule {}
