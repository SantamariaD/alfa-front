import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-domicilio-form',
  templateUrl: './domicilio-form.component.html',
  styleUrls: ['./domicilio-form.component.scss']
})
export class DomicilioFormComponent implements OnInit {
  usuarioForm: UntypedFormGroup = new UntypedFormGroup({
    nombre: new UntypedFormControl('', [Validators.required]),
    primerApellido: new UntypedFormControl('', [Validators.required]),
    segundoApellido: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required]),
    curp: new UntypedFormControl('', [Validators.required]),
    rfc: new UntypedFormControl('', [Validators.required]),
    telefono: new UntypedFormControl('', [Validators.required]),
    fechaNac: new UntypedFormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  enviarForm(){
    
  }

}
