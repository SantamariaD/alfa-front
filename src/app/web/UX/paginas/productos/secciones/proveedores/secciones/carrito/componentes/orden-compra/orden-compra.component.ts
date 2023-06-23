import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import {
  CatalogoProveedor,
  ClaveValor,
} from 'src/app/web/informacion/interface/catalogo-proveedores';
import {
  Proveedor,
  ProveedoresStore,
} from 'src/app/web/informacion/interface/proveedores';
import { selectProveedoresStore } from 'src/app/web/informacion/state';
import {
  CORREO_EMPRESA,
  DIRECCION_EMPRESA,
  IVA,
  NOMBRE_EMPRESA,
  SITIO_WEB_EMPRESA,
  TELEFONO_EMPRESA,
} from 'src/app/web/informacion/utils/variables-globales';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.scss'],
})
export class OrdenCompraComponent implements OnInit {
  /**
   * @Input proveedor: arreglo de catalogo de proveedores filtrado
   */
  @Input() proveedor: ClaveValor = {} as ClaveValor;

  /**
   * @Varible subtotal: subtotal de la compra
   */
  subtotal = 0;

  /**
   * @Varible total: subtotal de la compra
   */
  total = 0;

  /**
   * @Varible descuento: total en descuentos de producto
   */
  descuento = 0;

  /**
   * @Varible otros: total en otros de producto
   */
  otros = 0;

  /**
   * @Varible fecha: dine la fecha actual
   */
  fecha: Date = new Date();

  /**
   * @Varible infoEmpresa: tiene la información de la empresa
   */
  infoEmpresa = {
    nombre: NOMBRE_EMPRESA,
    direccion: DIRECCION_EMPRESA,
    telefono: TELEFONO_EMPRESA,
    correo: CORREO_EMPRESA,
    sitioWeb: SITIO_WEB_EMPRESA,
    instruccionesEspeciales: '',
    iva: IVA,
  };

  /**
   * @Varible Editar: Muestra la opcion para que se editen campos
   */
  editar = false;

  /**
   * @Varible numeroOrden: Número de la orden de compra
   */
  numeroOrden = 0;

  /**
   * @variable switchValue
   */
  switchValue = false;

  /**
   * @variable proveedores: Datos que contiene la tabla
   */
  proveedorInfo: Proveedor = {} as Proveedor;

  /**
   * @formulario ordenForm: Formulario de la orden de compra
   */
  ordenForm: FormGroup = new FormGroup({
    nombreEmpresaVendedor: new FormControl(),
    representanteVendedor: new FormControl(),
    Vendedor: new FormControl(),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.consultarProveedores();
  }

  /**
   * @Metodo Cambio del switch
   */
  switch(valor: any): void {
    this.editar = valor;
  }

  /**
   * @Metodo Consulta todos los proveedores
   */
  private consultarProveedores(): void {
    this.store
      .select(selectProveedoresStore)
      .pipe(take(1))
      .subscribe((proveedor: ProveedoresStore) => {
        this.proveedorInfo = proveedor.proveedores.filter(
          (proveedor: Proveedor) => proveedor.nombre == this.proveedor.clave
        )[0];
      });

    this.proveedor.valor.map((producto: any) => {
      this.subtotal +=
        producto.precioCompra * producto.cantidadCompra -
        IVA * (producto.precioCompra * producto.cantidadCompra);

      this.total += producto.precioCompra * producto.cantidadCompra;
      this.descuento += producto.descuento * producto.precioCompra;
    });
  }
}
