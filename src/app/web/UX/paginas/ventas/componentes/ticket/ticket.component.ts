import {
  Component,
  Input,
  DoCheck,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, distinctUntilChanged, of } from 'rxjs';
import { ProductoTicket } from 'src/app/web/informacion/interface/productos';
import { Ticket } from 'src/app/web/informacion/interface/ticket';
import { formateoMoneda } from 'src/app/web/informacion/utils/funciones';
import { IVA } from 'src/app/web/informacion/utils/variables-globales';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  /**
   * @variable ticket: info de los productos que estan en el ticket
   */
  @Input() ticket: Ticket = {} as Ticket;

  variableObservable: Observable<ProductoTicket[]>;

  /**
   * @variable ticket: total del ticket
   */
  @Input() totalTicket: any;

  /**
   * @variable ticket: total de productos del ticket
   */
  @Input() totalProductos = 0;

  /**
   * @variable subtotalTicket: subtotal del ticket
   */
  @Input() subtotalTicket: any;

  /**
   * @variable iva: iva del ticket
   */
  iva = IVA;

  /**
   * @variable ticketEditarForm: información del ticket a editar
   */
  ticketEditarForm: FormGroup = new FormGroup({
    precioVenta: new FormControl(),
    cantidad: new FormControl(),
    iva: new FormControl(),
    observacion: new FormControl(),
  });

  /**
   * @variable drawerAbierto: indica si se abre o cierra el drawer
   */
  drawerAbierto = false;

  /**
   * @variable fecha: fecha del ticket
   */
  fecha = new Date();

  constructor() {
    this.variableObservable = of(this.ticket.productosVenta).pipe(
      distinctUntilChanged()
    );
  }

  ngOnInit(): void {
    setInterval(() => {
      this.fecha = new Date();
    }, 1000);
    this.variableObservable.subscribe(() => this.calculoTicket());
  }

  /**
   * @Metodo abre el drawer
   */
  abrirDrawer(posicion: number): void {
    this.drawerAbierto = true;
    this.ticketEditarForm.patchValue({
      precioVenta: this.ticket.productosVenta[posicion].precioVenta,
    cantidad: this.ticket.productosVenta[posicion].cantidad,
    iva: IVA*100+'%',
    observacion: '',
    })
    console.log(this.ticket.productosVenta[posicion]);
  }

  /**
   * @Metodo cierra el drawer
   */
  cerrarDrawer(): void {
    this.drawerAbierto = false;
  }

  /**
   * @Metodo Suma un producto
   */
  sumar(productoClick: ProductoTicket): void {
    if (productoClick.cantidad > 0) {
      this.ticket.productosVenta.map((producto: ProductoTicket) => {
        if (
          producto.codigoBarras == productoClick.codigoBarras ||
          producto.sku == productoClick.sku
        ) {
          producto.cantidad += 1;
          producto.total = formateoMoneda(
            producto.cantidad *
              parseFloat(
                productoClick.precioVenta.replace('$', '').replace(',', '')
              )
          );
        }
        return producto;
      });
      this.calculoTicket();
    }
  }

  /**
   * @Metodo Resta un producto
   */
  restar(productoClick: ProductoTicket): void {
    if (productoClick.cantidad > 1) {
      this.ticket.productosVenta.map((producto: ProductoTicket) => {
        if (
          producto.codigoBarras == productoClick.codigoBarras ||
          producto.sku == productoClick.sku
        ) {
          producto.cantidad -= 1;
          producto.total = formateoMoneda(
            producto.cantidad *
              parseFloat(
                productoClick.precioVenta.replace('$', '').replace(',', '')
              )
          );
        }
        return producto;
      });
      this.calculoTicket();
    }
    if (productoClick.cantidad == 0) {
      this.ticket.productosVenta = this.ticket.productosVenta.filter(
        (producto: ProductoTicket) => producto.id != productoClick.id
      );
    }
  }

  /**
   * @Metodo Pagar cuenta
   */
  pagarTicket(): void {
    console.log(this.ticket);
  }

  /**
   * @Metodo Calcula el total y subtotal del ticket
   */
  calculoTicket() {
    this.totalTicket = 0;
    this.totalProductos = 0;
    if (this.ticket.productosVenta) {
      this.ticket.productosVenta.forEach((producto: ProductoTicket) => {
        this.totalTicket += parseFloat(
          producto.total.replace('$', '').replace(',', '')
        );
        this.totalProductos += producto.cantidad;
      });
      this.subtotalTicket = formateoMoneda(
        this.totalTicket - this.totalTicket * IVA
      );
      this.totalTicket = formateoMoneda(this.totalTicket);
    }
  }
}
