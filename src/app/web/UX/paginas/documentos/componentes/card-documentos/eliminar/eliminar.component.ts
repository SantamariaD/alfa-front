import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Documento } from 'src/app/web/informacion/interface/documentos';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { DocumentosService } from 'src/app/web/informacion/servicios/documentos/documentos.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss'],
})
export class EliminarComponent implements OnInit {
  /**
   * @Input documento: Información del documento mostrado en la card
   */
  @Input() documento: Documento = {} as Documento;

  /**
   * @Output actualizarProducto: emite el evento de actualizar documento
   */
  @Output() eliminarProductoEmit = new EventEmitter<any>();

  constructor(
    private documentosService: DocumentosService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {}

  /**
   * @Metodo elimina el documento
   */
  clickEliminar(): void {
    this.documentosService
      .actualizarArchivoDocumento({ id: this.documento.id, activo: false })
      .subscribe(
        (respuestaActualizar: HttpClientServiceInterface<Documento>) => {
          this.message.success('Se elimino correctamente el documento');
          this.eliminarProductoEmit.emit();
        }
      );
  }
}
