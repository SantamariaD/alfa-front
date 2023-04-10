import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  estados: string[] = ['ocupado', 'activo', 'ausente'];
  openModal: boolean = false;
  claseStatus: string = 'check-circle';
  colorStatus: string = '#7FFF00';
  constructor() {}

  ngOnInit(): void {}

  selccionar() {
    this.openModal = !this.openModal;
  }

  cambioStatus(status: string) {
    switch (status) {
      case 'En línea':
        return (
          (this.claseStatus = 'check-circle'), (this.colorStatus = '#7FFF00')
        );

      case 'Ausente':
        return (
          (this.claseStatus = 'clock-circle'), (this.colorStatus = '#FFA500')
        );

      case 'No molestar':
        return (
          (this.claseStatus = 'info-circle'), (this.colorStatus = '#FF0000')
        );

      case 'Desconectado':
        return (
          (this.claseStatus = 'minus-circle'), (this.colorStatus = '#C0C0C0')
        );

      default:
        return this.claseStatus, this.colorStatus;
    }
  }
}
