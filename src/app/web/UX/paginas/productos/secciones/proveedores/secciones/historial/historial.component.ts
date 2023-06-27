import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize, take } from 'rxjs';
import {
  ClaveValor,
  ConsultaOrdenCompra,
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
import { formateoMoneda } from 'src/app/web/informacion/utils/funciones';

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
   * @variable totalCompras: muestra la orden de compra en el modal
   */
  totalCompras = '';

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
  datosTabla: Array<any> = [];

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
      .pipe(take(1))
      .subscribe((ordenesCompra: ConsultaOrdenCompra[]) => {
        if (ordenesCompra.length < 1) {
          this.ordenCompraService
            .consultarOrdenesCompra()
            .pipe(finalize(() => this.formateoDatos()))
            .subscribe({
              next: (
                respuestaConsulta: HttpClientServiceInterface<
                  Array<ConsultaOrdenCompra>
                >
              ) => {
                this.datosTabla = respuestaConsulta.payload;
                this.store.dispatch(
                  guardarOrdenesCompra({
                    ordenesCompra: respuestaConsulta.payload,
                  })
                );
              },
            });
        } else {
          let total = 0;
          this.datosTabla = ordenesCompra;
          this.datosTabla.map((ordenCompra: ConsultaOrdenCompra) => {
            if (typeof ordenCompra.total == 'number') {
              total += ordenCompra.total;
            } else {
              total += parseFloat(
                ordenCompra.total.replace('$', '').replace(',', '')
              );
            }

            return ordenCompra;
          });
          this.totalCompras = formateoMoneda(total);
        }
      });
  }

  /**
   * @Metodo Formateo los datos de las monedas para mostrar en pantalla
   */
  private formateoDatos(): void {
    let total = 0;
    this.datosTabla.map((ordenCompra: ConsultaOrdenCompra) => {
      total += parseFloat(ordenCompra.total);
      ordenCompra.total = formateoMoneda(parseFloat(ordenCompra.total));
      ordenCompra.subtotal = formateoMoneda(parseFloat(ordenCompra.subtotal));
      return ordenCompra;
    });
    this.totalCompras = formateoMoneda(total);
  }
}
