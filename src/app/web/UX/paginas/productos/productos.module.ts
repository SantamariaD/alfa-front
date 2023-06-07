import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { ProductosRoutingModule } from './productos-routing.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProveedoresComponent } from './secciones/proveedores/proveedores.component';
import { ComprasComponent } from './secciones/compras/compras.component';
import { VentasComponent } from './secciones/ventas/ventas.component';
import { AnalisisComponent } from './secciones/analisis/analisis.component';
import { StockComponent } from './secciones/stock/stock.component';
import { CardProductoComponent } from './secciones/stock/componentes/card-producto/card-producto.component';
import { InformacionComponent } from './secciones/stock/componentes/card-producto/informacion/informacion.component';
import { AgregarComponent } from './secciones/stock/componentes/agregar/agregar.component';
import { EditarComponent } from './secciones/stock/componentes/card-producto/editar/editar.component';
import { EliminarComponent } from './secciones/stock/componentes/card-producto/eliminar/eliminar.component';
import { AgregarCategoriaComponent } from './secciones/stock/componentes/agregar-categoria/agregar-categoria.component';



@NgModule({
  declarations: [
    ProveedoresComponent,
    ComprasComponent,
    VentasComponent,
    AnalisisComponent,
    StockComponent,
    CardProductoComponent,
    InformacionComponent,
    AgregarComponent,
    EditarComponent,
    EliminarComponent,
    AgregarCategoriaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductosRoutingModule,
    ComponentesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProveedoresComponent,
    ComprasComponent,
    VentasComponent,
    AnalisisComponent,
    StockComponent
  ]
})
export class ProductosModule { }
