import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { take } from 'rxjs';
import {
  Empleados,
  EmpleadosStore,
} from 'src/app/web/informacion/interface/empleados';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { ConsultaSucursales } from 'src/app/web/informacion/interface/sucursales';
import { ColumnaTabla } from 'src/app/web/informacion/interface/tabla';
import { EmpleadosService } from 'src/app/web/informacion/servicios/empleados/empleados.service';
import { SucursalesService } from 'src/app/web/informacion/servicios/sucursales/sucursales.service';
import {
  selectEmpleadosStore,
  selectSucursalesStore,
} from 'src/app/web/informacion/state';
import { guardarEmpleados } from 'src/app/web/informacion/state/empleados/empleados.actions';
import { guardarSucursales } from 'src/app/web/informacion/state/sucursales/sucursales.actions';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss'],
})
export class SucursalesComponent implements OnInit {
  /**
   * @variable mostrarCardSucursal: Muestra la card de la sucursal
   */
  mostrarCardSucursal = false;

  /**
   * @variable mostrarAgregarSucursal: Muestra la card de la sucursal
   */
  mostrarAgregarSucursal = false;

  /**
   * @variable empleados: Catalogo de empleados
   */
  empleados: Empleados[] = [];

  /**
   * @variable sucursal: Muestra la card de la sucursal
   */
  sucursal: ConsultaSucursales = {} as ConsultaSucursales;

  /**
   * @variable secciones: Contiene las secciones de la página
   */
  secciones = [
    { texto: 'Información Sucursales', seleccionado: true },
    { texto: 'Stock Sucursales', seleccionado: false },
  ];

  /**
   * @variable columnasTabla: Columnas que contiene la tabla
   */
  columnasTabla: Array<ColumnaTabla> = [
    { columna: 'Nombre sucursal', llave: 'nombreSucursal', busqueda: true },
    { columna: 'Teléfono', llave: 'telefono', busqueda: true },
    { columna: 'Correo', llave: 'correo', busqueda: true },
    { columna: 'Domicilio', llave: 'domicilio', busqueda: true },
  ];

  /**
   * @variable seccion: Contiene la seccione actual
   */
  seccion = 'Información Sucursales';

  /**
   * @variable datosTabla: Datos de la tabla
   */
  datosTabla: Array<ConsultaSucursales> = [];

  constructor(
    private sucursalesService: SucursalesService,
    private store: Store,
    private message: NzMessageService,
    private empleadosService: EmpleadosService
  ) {}

  ngOnInit(): void {
    this.consultarSucursales();
    this.consultarEmpleados();
  }

  /**
   * @Metodo Asigna la sección en la que nos encontramos
   */
  selectSeccion(seccion: string): void {
    this.seccion = seccion;
  }

  /**
   * @Metodo Captura el evento cuando se da click a la fila y muestra el producto
   */
  clickFila(sucursal: ConsultaSucursales): void {
    this.mostrarCardSucursal = true;
    this.sucursal = sucursal;
  }

  /**
   * @Metodo Captura el evento cuando se da click a la fila y muestra el producto
   */
  clickCerrarModal(cerrar: boolean): void {
    this.mostrarCardSucursal = false;
  }

  /**
   * @Metodo Captura el evento cuando se da click en cerrar modal agregar sucursal
   */
  clickCerrarModalAgregar(): void {
    this.mostrarAgregarSucursal = false;
  }

  /**
   * @Metodo Guarda una sucrusal nueva
   */
  guardarSucursal(sucursal: any): void {
    this.sucursalesService.guardarSucursal(sucursal).subscribe({
      next: (
        respuestaActualizar: HttpClientServiceInterface<ConsultaSucursales[]>
      ) => {
        this.store.dispatch(
          guardarSucursales({ sucursales: respuestaActualizar.payload })
        );
        this.message.create('success', `Se guardo correctamente la sucursal`);
        this.consultarSucursales();
      },
      error: (error) => console.log(error),
    });
  }

  /**
   * @Metodo Muestra el modal para agregar una sucursal
   */
  agregarSucursal(): void {
    this.mostrarAgregarSucursal = true;
  }

  /**
   * @Metodo Actualiza la información de la sucursal
   */
  actualizarSucursal(sucursal: any): void {
    this.sucursalesService.actualizarSucursal(sucursal).subscribe({
      next: (
        respuestaActualizar: HttpClientServiceInterface<ConsultaSucursales[]>
      ) => {
        this.store.dispatch(
          guardarSucursales({ sucursales: respuestaActualizar.payload })
        );
        this.message.create(
          'success',
          `Se actualizó correctamente la sucursal`
        );
        this.consultarSucursales();
      },
      error: (error) => console.log(error),
    });
  }

  /**
   * @Metodo Elimina la sucursal
   */
  eliminarSucursal(idSucursal: any): void {
    this.sucursalesService.eliminarSucursal(idSucursal).subscribe({
      next: (
        respuestaActualizar: HttpClientServiceInterface<ConsultaSucursales[]>
      ) => {
        this.store.dispatch(
          guardarSucursales({ sucursales: respuestaActualizar.payload })
        );
        this.message.create('success', `Se eliminó correctamente la sucursal`);
        this.consultarSucursales();
      },
      error: (error) => console.log(error),
    });
  }

  /**
   * @Metodo Muestra el modal para agregar un producto
   */
  agregarProducto(): void {
    this.mostrarAgregarSucursal = true;
  }

  /**
   * @Metodo Consulta las sucursales
   */
  private consultarSucursales(): void {
    this.store
      .select(selectSucursalesStore)
      .pipe(take(1))
      .subscribe((sucursalesStore: ConsultaSucursales[]) => {
        if (sucursalesStore.length < 1) {
          this.sucursalesService.consultarSucursales().subscribe({
            next: (
              respuestaConsulta: HttpClientServiceInterface<
                ConsultaSucursales[]
              >
            ) => {
              this.datosTabla = respuestaConsulta.payload;
              this.store.dispatch(
                guardarSucursales({ sucursales: respuestaConsulta.payload })
              );
            },
          });
        } else {
          this.datosTabla = sucursalesStore;
        }
      });
  }

  private consultarEmpleados(): void {
    this.store
      .select(selectEmpleadosStore)
      .pipe(take(1))
      .subscribe((empleadosStore: EmpleadosStore) => {
        if (!empleadosStore.empleados) {
          this.empleadosService.traerTodosEmpleados().subscribe({
            next: (
              respuestaConsulta: HttpClientServiceInterface<Empleados[]>
            ) => {
              this.store.dispatch(
                guardarEmpleados({ empleados: respuestaConsulta.payload })
              );
              this.empleados = respuestaConsulta.payload;
            },
          });
        } else {
          this.empleados = empleadosStore.empleados;
        }
      });
  }
}
