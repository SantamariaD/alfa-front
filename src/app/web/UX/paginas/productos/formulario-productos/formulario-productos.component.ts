import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-productos',
  templateUrl: './formulario-productos.component.html',
  styleUrls: ['./formulario-productos.component.scss']
})
export class FormularioProductosComponent implements OnInit {

  productoForm: UntypedFormGroup = new UntypedFormGroup({
    nombre: new UntypedFormControl('', [Validators.required]),
    categoria: new UntypedFormControl('', [Validators.required]),
    precio: new UntypedFormControl('', [Validators.required]),
    sku: new UntypedFormControl('', [Validators.required]),
    codigoBarras: new UntypedFormControl('', [Validators.required]),
    proveedor: new UntypedFormControl('', [Validators.required]),
    descripcion: new UntypedFormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  enviarForm(){
    console.log(this.productoForm.value);
 }

 cancelar(value:any){
   console.log(value); 
 }

}
