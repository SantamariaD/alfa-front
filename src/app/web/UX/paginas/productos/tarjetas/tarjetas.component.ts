import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Producto } from 'src/app/web/informacion/interface/producto';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss']
})
export class TarjetasComponent implements OnInit{
 
 //@Productos
  vista:string = 'card';
  
  //@Productos
  @Input() producto:any;

  constructor(private modal: NzModalService) { }

  ngOnInit(): void {
  }

  editar(vista:string){
this.vista = vista;
  }

  cerrarModal() {
    this.vista = 'card';
    const modal:any = document.getElementById('ModalProducto');
    modal.classList.remove('active');
  }

  eliminar(): void {
    const modal:any = document.getElementById('ModalProducto');
    modal.classList.remove('active');
    this.modal.create({
      nzContent: 'Estas seguro que deseas eliminar ' + this.producto.nombre + ' de tu inventario ?'  ,
      nzOnOk: () => this.vista = 'card',
      nzOnCancel: () => {this.vista = 'card', modal.classList.add('active')}
    });
  }

}
