import { Component, Input, OnInit } from '@angular/core';
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
   *@FormularioEmpleado empleadoActualizaForm: este formulario se usa para actualizar los datos de un empleado
   */
   empleadoActualizaForm: FormGroup = new FormGroup({

    id: new FormControl(0),
  nombres:  new FormControl(''),
  apellido_paterno: new FormControl(''),
  apellido_materno: new FormControl(''),
  fecha_nacimiento:new FormControl(''),
  genero:new FormControl(''),
  estado_civil:new FormControl(''),
  curp:new FormControl(''),
  rfc:new FormControl(''),
  nss:new FormControl(''),
  direccion:new FormControl(''),
  telefono:new FormControl(''),
  correo_electronico:new FormControl(''),
  puesto:new FormControl(''),
  departamento:new FormControl(''),
  fecha_inicio:new FormControl(''),
  salario:new FormControl(''),
  horas_laborales:new FormControl(''),
  tipo_contrato:new FormControl(''),
  fecha_alta:new FormControl(''),
  fecha_baja:new FormControl(''),
   })

  constructor(private empleadoServise:EmpleadosService) { }

  ngOnInit(): void {
  }

  //Metodo para actualizar el emploeado
  actualizaEmpleado(){
this.empleadoServise.actualizarEmpleado(this.empleado).subscribe({
  next:( empleado: HttpClientServiceInterfaceNoPayload)=>{
console.log(empleado.mensaje)
  }, error: error => console.log(error)
})


}
}