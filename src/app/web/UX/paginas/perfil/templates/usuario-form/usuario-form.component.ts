import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UsuarioInterface } from 'src/app/web/informacion/interface/usuario';
import { CambioContraseñaService } from 'src/app/web/informacion/servicios/cambioContraseña/cambio-contraseña.service';
import { selectInfoUsuarioPeticion } from 'src/app/web/informacion/state';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {
confirmado:boolean =false;
actualizado:string ='';

originalPassword!:string;
  passwordForm: UntypedFormGroup = new UntypedFormGroup({
    password: new UntypedFormControl('', [Validators.required]),
  });

  newPasswordForm: UntypedFormGroup = new UntypedFormGroup({
    password: new UntypedFormControl('', [Validators.required]),
    confirm: new UntypedFormControl('', [Validators.required]),
  });
  store: any;


  constructor(private servicio:CambioContraseñaService) { }

  ngOnInit(): void {
    
  }

  validateConfirmPassword(){
    
  }

enviarForm(){
this.originalPassword = this.passwordForm.value
this.servicio.verificarContrasena(this.passwordForm.value).subscribe(respVerif =>{
    this.confirmado = respVerif.payload.contrasenaCorrecta
}) 
}

guardarForm(){
this.servicio.actualizaContrasena(this.originalPassword,this.newPasswordForm.value).subscribe(respAct =>{
  console.log(respAct.codigo)
  if(respAct.codigo === 200){
    this.actualizado = 'actualizado';
  }else{
    this.actualizado = 'error';
  }
})
}
}