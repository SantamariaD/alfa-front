import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalesComponent } from './modales/modales.component';
import { AlertasComponent } from './alertas/alertas.component';
import { ResultadosComponent } from './resultados/resultados.component';

@NgModule({
  declarations: [ModalesComponent, AlertasComponent, ResultadosComponent],
  imports: [CommonModule],
  exports: [ModalesComponent, AlertasComponent, ResultadosComponent],
})
export class FeedbackModule {}
