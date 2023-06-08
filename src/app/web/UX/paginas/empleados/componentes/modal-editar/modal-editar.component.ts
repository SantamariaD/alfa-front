import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Empleados } from 'src/app/web/informacion/interface/empleados';
import { HttpClientServiceInterface, HttpClientServiceInterfaceNoPayload } from 'src/app/web/informacion/interface/httpService';
import { EmpleadosService } from 'src/app/web/informacion/servicios/empleados/empleados.service';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.scss']
})
export class ModalEditarComponent implements OnInit {

  /**
   * @Input empleado: este input recibe el empleado seleccio0nado para editar
   */
  @Input() empleado: Empleados = {} as Empleados

  /**
   * @Output actEmpleado: este output envia un true que indica que se actualizo el epmleado y actualizar la vista.
   */
  @Output() actEmpleado= new EventEmitter<boolean>()

  /**
   *@FormularioEmpleado empleadoActualizaForm: este formulario se usa para actualizar los datos de un empleado
   */
   empleadoActualizaForm: FormGroup = new FormGroup({
    id:new FormControl(0),
  puesto:new FormControl(''),
  departamento:new FormControl(''),
  salario:new FormControl(''),
  horas_laborales:new FormControl(0),
  tipo_contrato:new FormControl(''),
   })

   /**
   *@MostrarNotificacion regresa un booleano para mostrar modal en caso que la actualización sea correcta
   */
   mostrarNotificacion = false;

   //contratos regresa el array de tipos de contratos que existen
   contratos:any = [{id:0,nombre:'indefinido'},{id:1,nombre:'extendido'},{id:2,nombre:'temporal'},{id:3,nombre:'comisión'}]

  constructor(private empleadoServise:EmpleadosService) { }

  

  ngOnInit(): void {
    this.empleadoActualizaForm.patchValue({
      id: this.empleado.id,
      puesto: this.empleado.puesto,
      departamento: this.empleado.departamento,
      salario: this.empleado.salario,
      horas_laborales: this.empleado.horas_laborales,
      tipo_contrato: this.empleado.tipo_contrato,
    });
  }

  //Metodo para actualizar el empleado
  actualizaEmpleado(){
this.empleadoServise.actualizarEmpleado(this.empleadoActualizaForm.value).subscribe({
  next:( empleado: HttpClientServiceInterfaceNoPayload)=>{
    this.mostrarNotificacion = true;
    this.actEmpleado.emit(true);
    setTimeout(() => (this.mostrarNotificacion = false), 5000);
  }, error: error => console.log(error)
})
}


}