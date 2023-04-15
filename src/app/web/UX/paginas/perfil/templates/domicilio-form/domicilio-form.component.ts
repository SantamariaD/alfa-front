import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UsuarioInterface } from 'src/app/web/informacion/interface/usuario';
import { InfoUsuarioService } from 'src/app/web/informacion/servicios/infoUsuario/info-usuario.service';
import { selectInfoUsuarioPeticion } from 'src/app/web/informacion/state';

@Component({
  selector: 'app-domicilio-form',
  templateUrl: './domicilio-form.component.html',
  styleUrls: ['./domicilio-form.component.scss']
})
export class DomicilioFormComponent implements OnInit {
  @Output() setCancelar = new EventEmitter();
  number!:number;
  usuario:any;

  usuarioForm: UntypedFormGroup = new UntypedFormGroup({
    nombres: new UntypedFormControl('', [Validators.required]),
    apellidoPaterno: new UntypedFormControl('', [Validators.required]),
    apellidoMaterno: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required]),
    curp: new UntypedFormControl('', [Validators.required]),
    rfc: new UntypedFormControl('', [Validators.required]),
    edad: new UntypedFormControl('', [Validators.required]),
    numeroTelefonico:new UntypedFormControl('', [Validators.required]),
    fechaNacimiento: new UntypedFormControl('', [Validators.required]),
    genero: new UntypedFormControl('', [Validators.required]),
    nss: new UntypedFormControl('', [Validators.required]),
    salario: new UntypedFormControl('', [Validators.required]),
    numeroEmpleado: new UntypedFormControl('', [Validators.required]),
    puesto: new UntypedFormControl('', [Validators.required]),
    jefeDirecto: new UntypedFormControl('', [Validators.required]),
    regimenFiscal: new UntypedFormControl('', [Validators.required]),
    calle: new UntypedFormControl('', [Validators.required]),
    numeroExterior: new UntypedFormControl('', [Validators.required]),
    numeroInterior: new UntypedFormControl('', [Validators.required]),
    colonia: new UntypedFormControl('', [Validators.required]),
    municipio: new UntypedFormControl('', [Validators.required]),
    estado: new UntypedFormControl('', [Validators.required]),
    codigoPostal: new UntypedFormControl('', [Validators.required]),
    area: new UntypedFormControl('', [Validators.required]),
  });
  store: any;

  constructor(private servicio:InfoUsuarioService, private http:HttpClient) { }

  ngOnInit(): void {
    this.store
    .select(selectInfoUsuarioPeticion)
    .subscribe(
      (usuarioResp: UsuarioInterface) => (this.usuario = usuarioResp)
    );

    this.usuarioForm.value.calle = this.usuario.calle;
  }

  enviarForm(){
     this.servicio.guardarInfo(this.usuarioForm.value);
  }

  cancelar(value:any){
    this.setCancelar = value; 
  }

}
