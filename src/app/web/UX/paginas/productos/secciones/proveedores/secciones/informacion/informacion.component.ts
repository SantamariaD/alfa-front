import { Component, OnInit } from '@angular/core';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { Proveedor } from 'src/app/web/informacion/interface/proveedores';
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
   * @variable columnasTabla: Columnas que contiene la tabla
   */
  columnasTabla: Array<ColumnaTabla> = [
    { columna: 'Nombre', llave: 'nombre', busqueda: true },
    { columna: 'Telefono', llave: 'telefono', busqueda: true },
    { columna: 'Correo', llave: 'correo', busqueda: true },
    { columna: 'Domicilio', llave: 'domicilio', busqueda: true },
  ];

  constructor(private proveedoresService: ProveedoresService) {}

  ngOnInit(): void {
    this.consultarProveedores();
  }

  /**
   * @Metodo Captura el evento cuando se da click a la fila y muestra el proveedor
   */
  clickFila(proveedor: Proveedor): void {
    this.mostrarCardProveedor = true;
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
  }

  /**
   * @Metodo captura el evento de actualizar un proveedores y consulta todos los proveedoress
   */
  eliminarProveedor(): void {
    this.mostrarCardProveedor = false;
  }

  /**
   * @Metodo Consulta todos los proveedores
   */
  private consultarProveedores(): void {
    this.proveedoresService.consultarProveedores().subscribe({
      next: (
        respuestaProveedores: HttpClientServiceInterface<Array<Proveedor>>
      ) => (this.datosTabla = respuestaProveedores.payload),
      error: (error) => console.log(error),
    });
  }
}
