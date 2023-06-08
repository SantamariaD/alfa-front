import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import {
  Proveedor,
  RespuestaProveedores,
} from 'src/app/web/informacion/interface/proveedores';
import { ColumnaTabla } from 'src/app/web/informacion/interface/tabla';
import { ProveedoresService } from 'src/app/web/informacion/servicios/proveedores/proveedores.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss'],
})
export class InformacionProveedoresComponent implements OnInit {
  /**
   * @variable proveedor: información del proveedor
   */
  proveedor: Proveedor = {} as Proveedor;

  /**
   * @variable datosTabla: Datos que contiene la tabla
   */
  datosTabla: Array<Proveedor> = [];

  /**
   * @variable mostrarCardProveedor: Muestra la card del proveedor
   */
  mostrarCardProveedor = false;

  /**
   * @variable totalProveedores: Muestra el total de los proveedor
   */
  totalProveedores = 0;

  /**
   * @variable mostrarAgregarProveedor: Muestra el modal de agregar proveedor
   */
  mostrarAgregarProveedor = false;

  /**
   * @variable ultimaActualizacion: Muestra la última actualización de los proveedores
   */
  ultimaActualizacion: any = undefined;

  /**
   * @variable columnasTabla: Columnas que contiene la tabla
   */
  columnasTabla: Array<ColumnaTabla> = [
    { columna: 'Nombre', llave: 'nombre', busqueda: true },
    { columna: 'Telefono', llave: 'telefono', busqueda: true },
    { columna: 'Correo', llave: 'correo', busqueda: true },
    { columna: 'Domicilio', llave: 'domicilio', busqueda: true },
  ];

  constructor(
    private message: NzMessageService,
    private proveedoresService: ProveedoresService
  ) {}

  ngOnInit(): void {
    this.consultarProveedores();
  }

  /**
   * @Metodo Captura el evento cuando se da click a la fila y muestra el proveedor
   */
  clickFila(proveedor: Proveedor): void {
    this.mostrarCardProveedor = true;
    this.proveedor = proveedor;
  }

  /**
   * @Metodo Captura el evento cuando se da click a la fila y muestra el proveedor
   */
  clickCerrarModal(cerrar: boolean): void {
    this.mostrarCardProveedor = cerrar;
  }

  /**
   * @Metodo captura el evento de actualizar un proveedor y consulta todos los proveedors
   */
  actualizacionProveedor(): void {
    this.mostrarCardProveedor = false;
    this.message.success(`Se actualizó correctamente el proveedor.`);
    this.consultarProveedores();
  }

  /**
   * @Metodo captura el evento de actualizar un proveedores y consulta todos los proveedoress
   */
  eliminarProveedor(): void {
    this.mostrarCardProveedor = false;
    this.message.success(`Se elimino correctamente el proveedor.`);
    this.consultarProveedores();
  }

  /**
   * @Metodo Muestra el modal para agregar un proveedor
   */
  agregarProveedor(): void {
    this.mostrarAgregarProveedor = true;
  }

   /**
   * @Metodo Captura el evento cuando se agrega un proveedor
   */
   clickGuardarProveedor(): void {
    this.mostrarAgregarProveedor = false;
    this.message.success(`Se guardo correctamente el proveedor.`);
  }

  /**
   * @Metodo Captura el evento cuando se da click en cerrar en modal
   */
  clickCerrarModalAgregarProveedor(): void {
    this.mostrarAgregarProveedor = false;
    this.consultarProveedores();
  }

  /**
   * @Metodo Consulta todos los proveedores
   */
  private consultarProveedores(): void {
    this.proveedoresService.consultarProveedores().subscribe({
      next: (
        respuestaProveedores: HttpClientServiceInterface<RespuestaProveedores>
      ) => {
        this.datosTabla = respuestaProveedores.payload.proveedores;
        this.totalProveedores = this.datosTabla.length;
        this.ultimaActualizacion =
          respuestaProveedores.payload.utlimaActualizacion.updated_at;
      },
      error: (error) => console.log(error),
    });
  }
}
