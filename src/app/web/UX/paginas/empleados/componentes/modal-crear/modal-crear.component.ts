import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClientServiceInterfaceNoPayload } from 'src/app/web/informacion/interface/httpService';
import { EmpleadosService } from 'src/app/web/informacion/servicios/empleados/empleados.service';

@Component({
  selector: 'app-modal-crear',
  templateUrl: './modal-crear.component.html',
  styleUrls: ['./modal-crear.component.scss']
})
export class ModalCrearComponent implements OnInit {

  /**
   *@FormularioEmpleado empleadoForm: este formulario se usa para crear un nuevo empleado
   */
   empleadoForm: FormGroup = new FormGroup({
    id:new FormControl(0),
  puesto:new FormControl('',[Validators.required]),
  departamento:new FormControl('',[Validators.required]),
  salario:new FormControl('',[Validators.required]),
  horas_laborales:new FormControl(0,[Validators.required]),
  nombres:new FormControl('',[Validators.required]),
  tipo_contrato:new FormControl('',[Validators.required]),
  apellido_paterno:new FormControl('',[Validators.required]),
  apellido_materno:new FormControl('',[Validators.required]),
  rfc:new FormControl('',[Validators.required]),
  curp:new FormControl('',[Validators.required]),
   })

   /**
    * @variable mostrarNotificacion: sirve para mostrar la notificacion de que se ha creado correctamente
    */
   mostrarNotificacion = false;

    //contratos regresa el array de tipos de contratos que existen
    contratos:any = [{id:0,nombre:'indefinido'},{id:1,nombre:'extendido'},{id:2,nombre:'temporal'},{id:3,nombre:'comisión'}]

    /**
     * 
     * @variable isVisible: este booleano se encarga de mostrar y ocultar el form de crear empleados
     */
    isVisible = false

    
    /**
   * @Output actEmpleado: este output envia un true que indica que se actualizo el epmleado y actualizar la vista.
   */
  @Output() actEmpleado= new EventEmitter<boolean>()

  constructor(private empleadoServise:EmpleadosService) { }

  ngOnInit(): void {
  }


  // Metodo para crear a los empleados
  crearEmpleado(){
this.empleadoServise.crearEmpleado(this.empleadoForm.value).subscribe({
  next:( empleado: HttpClientServiceInterfaceNoPayload)=>{
    this.mostrarNotificacion = true;
    this.actEmpleado.emit(true);
    this.empleadoForm.reset();
    setTimeout(() => (this.mostrarNotificacion = false), 5000);
  }, error: error => console.log(error)
})
  }

  showModal(){
    this.isVisible = true;
  }

  cerrarModal(){
    this.empleadoForm.reset();
    this.isVisible = false;
  }

}
