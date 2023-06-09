import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N, en_US, es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SharedModule } from 'src/app/web/informacion/utils/shared.module';
import { ComponentesModule } from './web/UX/componentes/componentes.module';
import { PaginasModule } from './web/UX/paginas/paginas.module';
import { appReducers } from './web/informacion/state';
import { QuillModule } from 'ngx-quill';

registerLocaleData(es);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,
    PaginasModule,
    NzLayoutModule,
    NzMenuModule,
    SharedModule,
    ComponentesModule,
    QuillModule.forRoot(),
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictActionImmutability: false,
        strictStateImmutability: false,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
