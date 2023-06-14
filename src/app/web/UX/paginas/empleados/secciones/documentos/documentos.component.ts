import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Documento, RespuestaDocumetosConsulta } from 'src/app/web/informacion/interface/documentos';
import { Empleados } from 'src/app/web/informacion/interface/empleados';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { EmpleadosService } from 'src/app/web/informacion/servicios/empleados/empleados.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {
/**
 * @Input empleado: el empleado que envia la card para consulta de documentos
 */
@Input() empleado:Empleados = {} as Empleados;

  /**
   * @Variable gridStyle: da estilos al sistema de grillas de las cards
   */
  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };

  /**
   * @Variable buscador:toma el valor que se escribe en el buscador para empleados
   */
  formBusqueda:FormGroup = new FormGroup({
    buscador: new FormControl('')
  })
 

  /**
   * @variable empleados: trae el array de todos los empleados
   */
  empleados:Empleados[] = [];

  /**
   * @variable documentos: trae el array de todos los documentos del empleado actual
   */
  documentos:Documento[] = [];

  /**
   * 
   * @param listaBusqueda: trae el resultado de la busqueda de empleados 
   */
  listaBusqueda:Empleados[] = [];

  constructor(private empleadoServise:EmpleadosService) { }

  ngOnInit(): void {
    if(!this.empleado.nombres){
      this.traerTodosEmpleados();
    }
   this.traerTodosDocumentos();
    console.log(this.empleado)
  }




  //Este metodo trae todos los empleados de la base
  traerTodosEmpleados(){
    this.empleadoServise.traerTodosEmpleados().subscribe({
        next:( empleados: HttpClientServiceInterface<Array<Empleados>>) => {
        this.empleados = empleados.payload
        this.empleados.forEach(element => {
          element.nombreCompleto = element.nombres + ' ' + element.apellido_materno + ' ' + element.apellido_paterno;
        });
        }, error: error => console.log(error)
    })
    }

    //Este metodo recibe los cambios del input de busqueda para hacer match con el epleado
    buscar(){
      this.listaBusqueda = this.empleados.filter(empleado =>{
        empleado.nombres.includes('Ana',0)
});
console.log( this.listaBusqueda);
    }

    traerTodosDocumentos(){
      const id = parseInt(this.empleado.id);
      this.empleadoServise.traerTodosDocumentos().subscribe(
        (
          respuestaDocumentos: HttpClientServiceInterface<RespuestaDocumetosConsulta>
        ) => {
          const documentos = respuestaDocumentos.payload.documentos;
          documentos.forEach(documento => {
            if(documento.id_user === id){
              this.documentos.push(documento);
            }
          });
        }
      );
    }
}
