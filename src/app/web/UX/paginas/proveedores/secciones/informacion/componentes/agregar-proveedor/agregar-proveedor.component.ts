import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { Proveedor } from 'src/app/web/informacion/interface/proveedores';
import { ProveedoresService } from 'src/app/web/informacion/servicios/proveedores/proveedores.service';
import { guardarProveedor } from 'src/app/web/informacion/state/proveedores/proveedores.actions';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.scss'],
})
export class AgregarProveedorComponent implements OnInit {
  /**
   * @Input proveedor: Información del proveedor mostrado en la card
   */
  @Input() proveedor: Proveedor = {} as Proveedor;

  /**
   * @Input mostrarModal: Controla si se muestra o no el modal
   */
  @Input() mostrarModal = false;

  /**
   * @Output clickCerrar: manda el evento al dar click sobre el icono X
   */
  @Output() clickCerrar = new EventEmitter<any>();

  /**
   * @Output clickGuardarProveedor: manda el evento al guardar proveedor
   */
  @Output() clickGuardarProveedor = new EventEmitter<any>();

  /**
   * @Formulario guardarForm: fomulario para guardar el proveedor
   */
  guardarForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    domicilio: new FormControl('', [Validators.required]),
    representante: new FormControl('', [Validators.required]),
    sitioWeb: new FormControl(null),
  });

  constructor(
    private proveedoresService: ProveedoresService,
    private store: Store
  ) {}

  ngOnInit(): void {}

  /**
   * @Metodo cierra el modal
   */
  cerrarModal(): void {
    this.clickCerrar.emit(false);
  }

  /**
   * @Metodo guarda un nuevo proveedor
   */
  guardarProveedor(): void {
    this.proveedoresService.guardarProveedor(this.guardarForm.value).subscribe({
      next: (respuestaProveedors: HttpClientServiceInterface<Proveedor>) => {
        this.store.dispatch(
          guardarProveedor({ proveedor: respuestaProveedors.payload })
        );
        this.clickGuardarProveedor.emit(true);
        this.guardarForm.reset();
      },
    });
  }
}
