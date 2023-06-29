import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-agregar',
  templateUrl: './card-agregar.component.html',
  styleUrls: ['./card-agregar.component.scss'],
})
export class CardAgregarComponent implements OnInit {
  /**
   * @Output clickCerrar: manda el evento al dar click sobre el icono X
   */
  @Output() clickCerrar = new EventEmitter<any>();

  /**
   * @Output clickGuardar: manda el evento al dar click en guardar evento
   */
  @Output() clickGuardar = new EventEmitter<any>();

  /**guardar evento del calendrio
   */
  guardarEvento: FormGroup = new FormGroup({
    idUsuario: new FormControl(0, [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    contenido: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}

  /**
   * @Metodo cerrar modal
   */
  clickCerrarModal(): void {
    this.clickCerrar.emit(false);
  }

  /**
   * @Metodo guarda el evento al calendario
   */
  guardarEventoPeticion(): void {
    const idUsuario = localStorage.getItem('id') || '';
    this.guardarEvento.patchValue({
      idUsuario: parseInt(idUsuario),
    });
    this.clickGuardar.emit(this.guardarEvento.value);
  }
}
