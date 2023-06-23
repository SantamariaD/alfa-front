import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Area } from 'src/app/web/informacion/interface/areas';
import {
  Documento,
  RespuestaDocumetosConsulta,
} from 'src/app/web/informacion/interface/documentos';
import { Empleados } from 'src/app/web/informacion/interface/empleados';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { AreasService } from 'src/app/web/informacion/servicios/areas/areas.service';
import { EmpleadosService } from 'src/app/web/informacion/servicios/empleados/empleados.service';
import { ENDPOINTS } from 'src/app/web/informacion/utils/endpoint';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss'],
})
export class DocumentosComponent implements OnInit, OnDestroy {
  /**
   * @Input empleado: el empleado que envia la card para consulta de documentos
   */
  @Input() empleado: Empleados = {} as Empleados;


  /**
   * @viewChild selectElement: esta id controla el elemento select de areas del template
   */
  @ViewChild('selectElement') selectElementRef!: ElementRef;

  /**
   * @viewChild selectElement: esta id controla el elemento select de areas del template
   */
  @ViewChild('selectEmpleado') selectEmpleadoRef!: ElementRef;

  /**
   * @Formulario buscador:toma el valor que se escribe en el buscador para empleados
   */
  formBusqueda: FormGroup = new FormGroup({
    buscador: new FormControl(''),
  });

  /**
   * 
   */
  empleadoSeleccionado = null;


  /**
   * @Variable gridStyle: da estilos al sistema de grillas de las cards
   */
  gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

  /**
   * @variable empleados: trae el array de todos los empleados
   */
  empleados: Empleados[] = [];

  /**
   * @variable documentos: trae el array de todos los documentos del empleado actual
   */
  documentos: Documento[] = [];

  /**
   *
   * @param listaBusqueda: trae el resultado de la busqueda de empleados
   */
  listaBusqueda: Empleados[] = [];

  /**
   * @variable mostrarVisor: este booleano muestra el visor de documentos o lo oculta
   */
  mostrarVisor = false;

  /**
   * @variable urlDescarga: contiene la url de descarga que necesita el visor de documentos
   */
  urlDescarga = '';

  /**
   * @variable areas: este arreglo contiene todas las areas de la empresa
   */
  areas:Area[] = [];


  constructor(
    private empleadoServise: EmpleadosService,
    private modal: NzModalService,
    private areaService:AreasService
  ) {}

  ngOnInit(): void {
      this.traerTodosEmpleados();
    this.traerTodasAreas();
    if(this.empleado.curp){
      this.traerTodosDocumentos();
    }
  }

  ngOnDestroy() {
    this.empleado = {} as Empleados
  }

  //Este metodo trae todos los empleados de la base
  traerTodosEmpleados() {
    this.empleadoServise.traerTodosEmpleados().subscribe({
      next: (empleados: HttpClientServiceInterface<Array<Empleados>>) => {
        this.empleados = empleados.payload;
        this.empleados.forEach((element) => {
          element.nombreCompleto =
            element.nombres +
            ' ' +
            element.apellido_materno +
            ' ' +
            element.apellido_paterno;
        });
      },
      error: (error) => console.log(error),
    });
  }

  //Este metodo recibe los cambios del input de busqueda para hacer match con el epleado buscado
  buscar() {
    this.selectElementRef.nativeElement.selectedIndex = 0;
    this.listaBusqueda = this.empleados.filter((empleado) =>
      empleado.nombreCompleto.includes(this.formBusqueda.value.buscador)
    );
    console.log(this.listaBusqueda);
  }

  //Este metodo trae todos los documentos de los empleados y extrae los del empleado vigente en pantalla
  traerTodosDocumentos() {
    const id = parseInt(this.empleado.id);
    this.empleadoServise.traerTodosDocumentos().subscribe({
      next: (
        respuestaDocumentos: HttpClientServiceInterface<Array<Documento>>
      ) => {
        respuestaDocumentos.payload.forEach((documento) => {
          if (documento.id_emp === id) {
            this.documentos.push(documento);
          }
        });
      },
      error: (error) => console.log(error),
    });
  }

  // Modal que evalua si un documento es aceptado o no
  modalRevision(estatus: string, documento: Documento): void {
    let titulo: string = '';
    if (estatus === 'aceptado') {
      titulo =
        '¿Está seguro que este documento cumple con lo requerido y deseas aceptarlo?';
    } else {
      titulo =
        '¿Está seguro que este documento no cumple con lo requerido y desea rechazarlo?';
    }
    this.modal.confirm({
      nzTitle: titulo,
      nzContent:
        '<b style="color: red;"Este documento se ira a la papelera de resiclaje</b>',
      nzOkText: 'Si',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        (this.documentos = []),
          this.actualizaDocumento(documento, estatus),
          this.traerTodosDocumentos();
      },
      nzOnCancel: () => 'cancel',
    });
  }

  //Este metodo actualiza el estatus del documento según sea el caso
  actualizaDocumento(documento: Documento, estatus: string) {
    const dataDocumento = {
      id: documento.id,
      estatus: estatus,
    };
    this.empleadoServise.actualizarDocumento(dataDocumento).subscribe({
      next: (respuestaDocumentos: HttpClientServiceInterface<Documento>) => {
        console.log(respuestaDocumentos.payload);
      },
      error: (error) => console.log(error),
    });
  }

  // abrirVisor este metodo genera los parametros que recibe el visor de documentos y activa el booleano que lo muestra
  abrirVisor(documento: Documento) {
    console.log(documento);
    const urlBase = environment.production
      ? environment.urls.backProduction
      : environment.urls.backDevelop;
    this.urlDescarga =
      urlBase +
      ENDPOINTS.empleados.descargarDocumento +
      '/' +
      documento.uuid +
      '/' +
      documento.extension +
      '/' +
      documento.area +
      '/' +
      documento.nombre_archivo;

    this.mostrarVisor = true;
  }

  cerrarVisor() {
    this.mostrarVisor = false;
  }

  traerTodasAreas(){
this.areaService.consultarAreas().subscribe({
  next: (todasAreas:HttpClientServiceInterface<Area[]> ) => {
    this.areas = todasAreas.payload;
  }, error: (error) => console.log(error)
});
  }

  seleccionarArea(event:Event){
    this.empleadoSeleccionado = null;
    this.formBusqueda.patchValue({
      buscador: '' 
    });
    const valorSeleccionado = (event.target as HTMLSelectElement).value;
    console.log(valorSeleccionado);
    this.listaBusqueda = [];
    this.empleados.forEach(empleado =>{
      if(empleado.departamento === valorSeleccionado){
        this.listaBusqueda.push(empleado);
      }
    })
  }

  seleccionarEmpleado(event:Event){
    this.empleadoSeleccionado = null;
    this.documentos = [];
    const valorSeleccionado = (event.target as HTMLSelectElement).value;
    this.empleados.forEach(empleado =>{
     if(empleado.nombreCompleto === valorSeleccionado){
      this.empleado = empleado;
      this. traerTodosDocumentos();
     } 
    })
  }
}
