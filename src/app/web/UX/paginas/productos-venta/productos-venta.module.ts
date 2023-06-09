import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockVentaRoutingModule } from './productos-venta-routing.module';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarComponent } from './componentes/agregar/agregar.component';
import { AgregarCategoriaComponent } from './componentes/agregar-categoria/agregar-categoria.component';
import { CardProductoComponent } from './componentes/card-producto/card-producto.component';
import { EditarComponent } from './componentes/card-producto/editar/editar.component';
import { EliminarComponent } from './componentes/card-producto/eliminar/eliminar.component';
import { InformacionComponent } from './componentes/card-producto/informacion/informacion.component';
import { ProductosVentaComponent } from './productos-venta.component';

@NgModule({
  declarations: [
    ProductosVentaComponent,
    AgregarComponent,
    AgregarCategoriaComponent,
    CardProductoComponent,
    EditarComponent,
    EliminarComponent,
    InformacionComponent,
  ],
  imports: [
    CommonModule,
    StockVentaRoutingModule,
    SharedModule,
    ComponentesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AgregarComponent
  ]
})
export class StockVentasModule {}
