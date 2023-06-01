import { Component, Input, OnInit } from '@angular/core';
import { Documento } from 'src/app/web/informacion/interface/documentos';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {

   /**
   * @Input producto: Información del producto mostrado en la card
   */
   @Input() documento: Documento = {} as Documento;

  constructor() { }

  ngOnInit(): void {
  }

}
