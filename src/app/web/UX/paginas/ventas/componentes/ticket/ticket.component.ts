import { Component, Input, DoCheck, OnInit, SimpleChanges } from '@angular/core';
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

  /**
   * @variable ticket: total del ticket
   */
  totalTicket: any;

  /**
   * @variable ticket: total de productos del ticket
   */
  totalProductos = 0;

  /**
   * @variable subtotalTicket: subtotal del ticket
   */
  subtotalTicket: any;

  /**
   * @variable iva: iva del ticket
   */
  iva = IVA;

  /**
   * @variable fecha: fecha del ticket
   */
  fecha = new Date();

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.fecha = new Date();
    }, 1000);
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
