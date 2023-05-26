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
  @Input() columnasTabla: Array<ColumnaTabla> = [
    {
      columna: 'nombre',
      busqueda: true,
    },
    {
      columna: 'edad',
      busqueda: true,
    },
    {
      columna: 'sexo',
      busqueda: true,
    },
  ];

  /**
   * @Input filasTabla: Array que contiene las filas de la tabla que deben ir
   * en orden con respecto a las columnas
   */
  @Input() filasTabla: readonly any[] = [
    {
      nombre: 'diego',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'fgdf',
      edad: '15',
      sexo: 'Masculino',
    },
    {
      nombre: 'bgfsdf b',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'diegfbsfgo',
      edad: '25',
      sexo: 'Masculino',
    },
    {
      nombre: 'bfgb',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'dibfdbego',
      edad: '45',
      sexo: 'Masculino',
    },
    {
      nombre: 'diegfbfdbo',
      edad: '26',
      sexo: 'Masculino',
    },
    {
      nombre: 'diebvfadbgo',
      edad: '26',
      sexo: 'Masculino',
    },
    {
      nombre: 'diegsayjsrtjso',
      edad: '25',
      sexo: 'Masculino',
    },
    {
      nombre: 'ditjtjtrego',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'dijstrkmego',
      edad: '32',
      sexo: 'Masculino',
    },
    {
      nombre: 'dijstrjego',
      edad: '32',
      sexo: 'Masculino',
    },
    {
      nombre: 'ntrgn',
      edad: '30',
      sexo: 'Masculino',
    },
    {
      nombre: 'dieytntngo',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'nytneyt',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'diegonytn',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'dientyneytgo',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'dielktykygo',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'dieytkgo',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'dieytksgo',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'diego',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'fgdf',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'bgfsdf b',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'diegfbsfgo',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'bfgb',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'dibfdbego',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'diegfbfdbo',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'diebvfadbgo',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'diegsayjsrtjso',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'ditjtjtrego',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'dijstrkmego',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'dijstrjego',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'ntrgn',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'dieytntngo',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'nytneyt',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'diegonytn',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'dientyneytgo',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'dielktykygo',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'dieytkgo',
      edad: 20,
      sexo: 'Masculino',
    },
    {
      nombre: 'dieytksgo',
      edad: 20,
      sexo: 'Masculino',
    },
  ];

  /**
   * @Output clickFila: Captura el evento click de una fila devolviendo la info de la fila
   */
  @Output() clickFila = new EventEmitter<any>();

  /**
   * @variable filasBusqueda: Copia que contiene las filas de la tabla que deben
   * ir en orden con respecto a las columnas
   */
  filasBusqueda: readonly any[] = [];

  /**
   * @variable currentPage: Pagina actual
   */
  currentPage = 1;

  /**
   * @variable pageSize: Tamaño de la pagina
   */
  pageSize = 8;

  /**
   * @formulario tablaForm: Formularia para filtrar datos de la tabla
   */
  tablaForm: FormGroup = new FormGroup({
    busqueda: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {
    this.filasBusqueda = this.filasTabla;
    this.filasTabla.map((fila) => {
      this.columnasTabla.map(
        (columna) => (fila[columna.columna] = fila[columna.columna].toString())
      );
    });
  }

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
