import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockRoutingModule } from './almacen-compras-routing.module';
import { StockComponent } from './almacen-compras.component';
import { CardProductoComponent } from './componentes/card-producto/card-producto.component';
import { AgregarComponent } from './componentes/agregar/agregar.component';
import { EditarComponent } from './componentes/card-producto/editar/editar.component';
import { EliminarComponent } from './componentes/card-producto/eliminar/eliminar.component';
import { AgregarCategoriaComponent } from './componentes/agregar-categoria/agregar-categoria.component';
import { InformacionComponent } from './componentes/card-producto/informacion/informacion.component';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { ComponentesModule } from 'src/app/web/UX/componentes/componentes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StockComponent,
    CardProductoComponent,
    InformacionComponent,
    AgregarComponent,
    EditarComponent,
    EliminarComponent,
    AgregarCategoriaComponent,
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    SharedModule,
    ComponentesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class StockModule {}
