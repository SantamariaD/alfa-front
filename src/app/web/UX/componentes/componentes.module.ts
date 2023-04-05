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
import { CalendarioRoutingModule } from '../paginas/calendario/calendario-routing.module';
import { DocumentosRoutingModule } from '../paginas/documentos/documentos-routing.module';
import { SolicitudesRoutingModule } from '../paginas/solicitudes/solicitudes-routing.module';

@NgModule({
  declarations: [
    SiderComponent,
    FooterComponent,
    NavbarComponent,
    SeccionesCabeceraComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeedbackModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    CalendarioRoutingModule,
    DocumentosRoutingModule,
    SolicitudesRoutingModule
  ],
  exports: [
    SiderComponent,
    FooterComponent,
    NavbarComponent,
    SeccionesCabeceraComponent,
  ],
})
export class ComponentesModule {}
