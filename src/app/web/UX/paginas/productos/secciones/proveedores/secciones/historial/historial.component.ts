import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import {
  CatalogoProveedor,
  ClaveValor,
  ConsultaOrdenCompra,
  OrdenCompraInfo,
} from 'src/app/web/informacion/interface/catalogo-proveedores';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import {
  Proveedor,
  ProveedoresStore,
  RespuestaProveedores,
} from 'src/app/web/informacion/interface/proveedores';
import { ColumnaTabla } from 'src/app/web/informacion/interface/tabla';
import { OrdenCompraService } from 'src/app/web/informacion/servicios/orden-compra/orden-compra.service';
import { ProveedoresService } from 'src/app/web/informacion/servicios/proveedores/proveedores.service';
import {
  selectOrdenesCompraStore,
  selectProveedoresStore,
} from 'src/app/web/informacion/state';
import { guardarOrdenesCompra } from 'src/app/web/informacion/state/ordenesCompra/ordenesCompra.actions';
import { guardarProveedores } from 'src/app/web/informacion/state/proveedores/proveedores.actions';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent implements OnInit {
  /**
   * @variable mostrarOrdenModal: muestra la orden de compra en el modal
   */
  mostrarOrdenModal = false;

  /**
   * @variable proveedores: contine la información de todos los proveedores
   */
  proveedores: Array<Proveedor> = [];

  /**
   * @variable proveedorSeleccionado: muestra la orden de compra en el modal
   */
  proveedorSeleccionado: ClaveValor = {} as ClaveValor;

  /**
   * @variable columnasTabla: Columnas que contiene la tabla
   */
  columnasTabla: Array<ColumnaTabla> = [
    { columna: 'Número de orden', llave: 'id', busqueda: true },
    { columna: 'Fecha', llave: 'created_at', busqueda: true },
    { columna: 'Subtotal', llave: 'subtotal', busqueda: true },
    { columna: 'Total', llave: 'total', busqueda: true },
  ];

  /**
   * @variable datosTabla: Datos que contiene la tabla
   */
  datosTabla: Array<ConsultaOrdenCompra> = [];

  constructor(
    private proveedoresService: ProveedoresService,
    private ordenCompraService: OrdenCompraService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.consultarProveedores();
    this.consultarOrdenesCompra();
  }

  /**
   * @Metodo Muestra la orden de compra al darle clicl a la fila
   */
  clickFila(fila: ConsultaOrdenCompra): void {
    console.log(fila);
    const infoProveedor = this.proveedores.filter(
      (proveedor: Proveedor) => proveedor.id == fila.idProveedor
    )[0];
    this.proveedorSeleccionado = {
      valor: fila.catalogoProveedor,
      clave: infoProveedor.nombre,
      idProveedor: infoProveedor.id,
    };
    this.mostrarOrdenModal = true;
  }

  /**
   * @Metodo Muestra el modal con la orden de compra
   */
  clickCerrarModal(): void {
    this.mostrarOrdenModal = false;
  }

  /**
   * @Metodo Consulta todos los proveedores
   */
  private consultarProveedores(): void {
    this.store
      .select(selectProveedoresStore)
      .pipe(take(1))
      .subscribe((proveedor: ProveedoresStore) => {
        if (!proveedor?.proveedores) {
          this.proveedoresService.consultarProveedores().subscribe({
            next: (
              respuestaProveedores: HttpClientServiceInterface<RespuestaProveedores>
            ) => {
              this.proveedores = respuestaProveedores.payload.proveedores;
              this.store.dispatch(
                guardarProveedores({
                  proveedores: respuestaProveedores.payload.proveedores,
                })
              );
            },
            error: (error) => console.log(error),
          });
        } else {
          this.proveedores = proveedor.proveedores;
        }
      });
  }

  /**
   * @Metodo Consulta todos las ordenes e compra
   */
  private consultarOrdenesCompra(): void {
    this.store
      .select(selectOrdenesCompraStore)
      .subscribe((ordenesCompra: ConsultaOrdenCompra[]) => {
        if (ordenesCompra.length < 1) {
          this.ordenCompraService.consultarOrdenesCompra().subscribe({
            next: (
              respuestaConsulta: HttpClientServiceInterface<
                Array<ConsultaOrdenCompra>
              >
            ) => {
              this.datosTabla = respuestaConsulta.payload;
              this.store.dispatch(
                guardarOrdenesCompra({ ordenesCompra: this.datosTabla })
              );
            },
          });
        } else {
          this.datosTabla = ordenesCompra;
        }
      });
  }
}
