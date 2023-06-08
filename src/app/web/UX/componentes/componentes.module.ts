import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiderComponent } from './sider/sider.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { SeccionesCabeceraComponent } from './secciones-cabecera/secciones-cabecera.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FeedbackModule } from './feedback/feedback.module';
import { QuillModule } from 'ngx-quill';
import { DocumentosRoutingModule } from '../paginas/documentos/documentos-routing.module';
import { SolicitudesRoutingModule } from '../paginas/solicitudes/solicitudes-routing.module';
import { IconoArchivoComponent } from './icono-archivo/icono-archivo.component';
import { TablaComponent } from './tabla/tabla.component';
import { CurrencyPipe } from './pipes/currencyPipe/currency.pipe';

@NgModule({
  declarations: [
    SiderComponent,
    FooterComponent,
    NavbarComponent,
    SeccionesCabeceraComponent,
    IconoArchivoComponent,
    TablaComponent,
    CurrencyPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeedbackModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    DocumentosRoutingModule,
    SolicitudesRoutingModule
  ],
  exports: [
    SiderComponent,
    FooterComponent,
    NavbarComponent,
    SeccionesCabeceraComponent,
    IconoArchivoComponent, 
    TablaComponent,
    CurrencyPipe
  ],
})
export class ComponentesModule {}
