import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColumnaTabla } from 'src/app/web/informacion/interface/tabla';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent implements OnInit {
  /**
   * @Input columnasTabla: Array que contiene las columnas de la tabla.
   * Con el parametro "busqueda" en true se pone un filtrador en dicha columna
   */
  @Input() columnasTabla: Array<ColumnaTabla> = [];

  /**
   * @Input filasTabla: Array que contiene las filas de la tabla que deben ir
   * en orden con respecto a las columnas
   */
  @Input() filasTabla: readonly any[] = [];

  /**
   * @Output clickFila: Captura el evento click de una fila devolviendo la info de la fila
   */
  @Output() clickFila = new EventEmitter<any>();

  /**
   * @Input filasBusqueda: Copia que contiene las filas de la tabla que deben
   * ir en orden con respecto a las columnas
   */
  @Input() filasBusqueda: readonly any[] = [];

  /**
   * @variable currentPage: Pagina actual
   */
  currentPage = 1;

  /**
   * @variable pageSize: Tamaño de la pagina
   */
  pageSize = 5;

  /**
   * @formulario tablaForm: Formularia para filtrar datos de la tabla
   */
  tablaForm: FormGroup = new FormGroup({
    busqueda: new FormControl(''),
  });

  constructor() {
  }

  ngOnInit(): void { }

  /**
   * @Metodo filtra las filas de la tabla que contengan caracteres que se ingresan en el input
   */
  buscar(columna: string): void {
    this.filasTabla = this.filasTabla.filter((fila) =>
      fila[columna].includes(this.tablaForm.value.busqueda)
    );
  }

  /**
   * @Metodo devuelve los valores de la tabla
   */
  reset(): void {
    this.filasTabla = this.filasBusqueda;
  }

  /**
   * @Metodo captura el evento click de la fila
   */
  clickFilaEmit(fila: any): void {
    this.clickFila.emit(fila);
  }

  /**
   * @Metodo pagina los datos de la tabla
   */
  get paginadorFilasTabla(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filasTabla.slice(startIndex, startIndex + this.pageSize);
  }
}
