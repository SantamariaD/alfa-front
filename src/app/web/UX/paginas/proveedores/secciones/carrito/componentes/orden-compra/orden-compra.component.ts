import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { finalize, take } from 'rxjs';
import {
  ClaveValor,
  ConsultaOrdenCompra,
  OrdenCompraInfo,
  ProductoOrdenCompra,
} from 'src/app/web/informacion/interface/catalogo-proveedores';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import {
  Proveedor,
  ProveedoresStore,
} from 'src/app/web/informacion/interface/proveedores';
import { OrdenCompraService } from 'src/app/web/informacion/servicios/orden-compra/orden-compra.service';
import { ProductoOrdenCompraService } from 'src/app/web/informacion/servicios/producto-orden-compra/producto-orden-compra.service';
import { selectProveedoresStore } from 'src/app/web/informacion/state';
import { guardarOrdenCompra } from 'src/app/web/informacion/state/ordenesCompra/ordenesCompra.actions';
import { formateoMoneda } from 'src/app/web/informacion/utils/funciones';
import {
  CORREO_EMPRESA,
  DIRECCION_EMPRESA,
  IVA,
  NOMBRE_EMPRESA,
  REPRESENTANTE,
  SITIO_WEB_EMPRESA,
  TELEFONO_EMPRESA,
} from 'src/app/web/informacion/utils/variables-globales';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { PdfService } from 'src/app/web/informacion/servicios/pdf/pdf.service';

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
   * @Input mostrarSwitch: Muestra el switch en la orden
   */
  @Input() mostrarSwitch = true;

  /**
   * @Input mostrarBoton: Muestra el boton en la orden
   */
  @Input() mostrarBoton = true;

  /**
   * @Input mostrarBoton: Muestra el boton en la orden
   */
  @Input() mostrarBotonPdf = false;

  /**
   * @Input numeroOrden: Número de la orden de compra
   */
  @Input() numeroOrden = 0;

  /**
   * @Output nombreProveedor: emite el nombre del proveedor
   */
  @Output() nombreProveedor = new EventEmitter<string>();

  /**
   * @Varible subtotal: subtotal de la compra
   */
  subtotal = 0;

  /**
   * @Varible total: subtotal de la compra
   */
  total = 0;

  /**
   * @Varible total: total de la compra formateado a moneda
   */
  totaFormat = '';

  /**
   * @Varible total: subtotal de la compra formateado a moneda
   */
  subtotalFormat = '';

  /**
   * @Varible descuento: total en descuentos de producto formateado a moneda
   */
  descuentoFormat = '';

  /**
   * @Varible otros: total en otros de producto formateado a moneda
   */
  otrosFormat = '';

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
    representante: REPRESENTANTE,
    sitioWeb: SITIO_WEB_EMPRESA,
    iva: IVA,
  };

  /**
   * @Varible ordenCompraInfo: contiene la información que se edita y muestra de la orden
   */
  ordenCompraInfo = {
    representanteVendedor: '',
    telefonoVendedor: '',
    correoVendedor: '',
    direccionVendedor: '',
    representanteComprador: '',
    telefonoComprador: '',
    correoComprador: '',
    direccionComprador: '',
    instruccionEspecial: '',
  };

  /**
   * @Varible Editar: Muestra la opcion para que se editen campos
   */
  editar = false;

  /**
   * @variable switchValue
   */
  switchValue = false;

  /**
   * @variable idOrdenCompra: contine el id de la orden de compra que se manda a guardar
   */
  idOrdenCompra = 0;

  /**
   * @variable proveedores: Datos que contiene la tabla
   */
  proveedorInfo: Proveedor = {} as Proveedor;

  /**
   * @formulario ordenForm: Formulario de la orden de compra
   */
  ordenForm: FormGroup = new FormGroup({
    idProveedor: new FormControl(0),
    representanteVendedor: new FormControl(''),
    telefonoVendedor: new FormControl(''),
    correoVendedor: new FormControl(''),
    direccionVendedor: new FormControl(''),
    representanteComprador: new FormControl(''),
    telefonoComprador: new FormControl(''),
    correoComprador: new FormControl(''),
    direccionComprador: new FormControl(''),
    instruccionEspecial: new FormControl(''),
    subtotal: new FormControl(0),
    descuento: new FormControl(0),
    otros: new FormControl(0),
    iva: new FormControl(0),
    total: new FormControl(0),
  });

  constructor(
    private store: Store,
    private ordenCompraService: OrdenCompraService,
    private productoOrdenCompraService: ProductoOrdenCompraService,
    private pdfService: PdfService
  ) {}

  ngOnInit(): void {
    this.consultarProveedores();
  }

  /**
   * @Metodo Guarda la orden de compra y los productos de la misma
   */
  guardarOrden(): void {
    this.ordenCompraService
      .guardarOrdenCompra(this.ordenForm.value)
      .pipe(
        finalize(() => {
          let nuevoArray = this.proveedor.valor.map(
            ({
              id,
              nombreProveedor,
              imagen,
              precioMaximoVenta,
              updated_at,
              created_at,
              ...resto
            }) => resto
          );

          nuevoArray.map(
            (producto: any) => (producto['idOrdenCompra'] = this.idOrdenCompra)
          );

          const ordenCompra: ConsultaOrdenCompra = {
            ...this.ordenForm.value,
            id: this.idOrdenCompra,
            created_at: new Date(),
            catalogoProveedor: nuevoArray,
            total: formateoMoneda(this.ordenForm.value.total),
            subtotal: formateoMoneda(this.ordenForm.value.subtotal),
          };
          this.store.dispatch(guardarOrdenCompra({ ordenCompra }));
        })
      )
      .subscribe({
        next: (
          respuestaGuardar: HttpClientServiceInterface<OrdenCompraInfo>
        ) => {
          this.idOrdenCompra = respuestaGuardar.payload.id;
          let nuevoArray = this.proveedor.valor.map(
            ({
              id,
              politicasVenta,
              nombreProducto,
              nombreProveedor,
              imagen,
              precioMaximoVenta,
              sku,
              updated_at,
              created_at,
              ...resto
            }) => resto
          );
          nuevoArray.map((producto: any) => {
            producto['idOrdenCompra'] = respuestaGuardar.payload.id;
            this.productoOrdenCompraService
              .guardarProductoOrdenCompra(producto)
              .subscribe({
                next: (
                  respuestaGuardar: HttpClientServiceInterface<ProductoOrdenCompra>
                ) => respuestaGuardar,
                error: (error) => console.log(error),
              });
          });
          this.nombreProveedor.emit(this.proveedor.clave);
        },
      });
  }

  /**
   * @Metodo Cambio del switch
   */
  switch(valor: any): void {
    this.editar = valor;
    if (!valor) {
      this.ordenCompraInfo = {
        representanteVendedor:
          this.ordenForm.value.representanteVendedor ||
          this.ordenCompraInfo.representanteVendedor,
        telefonoVendedor:
          this.ordenForm.value.telefonoVendedor ||
          this.ordenCompraInfo.telefonoVendedor,
        correoVendedor:
          this.ordenForm.value.correoVendedor ||
          this.ordenCompraInfo.correoVendedor,
        direccionVendedor:
          this.ordenForm.value.direccionVendedor ||
          this.ordenCompraInfo.direccionVendedor,
        representanteComprador:
          this.ordenForm.value.representanteComprador ||
          this.ordenCompraInfo.representanteComprador,
        telefonoComprador:
          this.ordenForm.value.telefonoComprador ||
          this.ordenCompraInfo.telefonoComprador,
        correoComprador:
          this.ordenForm.value.correoComprador ||
          this.ordenCompraInfo.correoComprador,
        direccionComprador:
          this.ordenForm.value.direccionComprador ||
          this.ordenCompraInfo.direccionComprador,
        instruccionEspecial:
          this.ordenForm.value.instruccionEspecial ||
          this.ordenCompraInfo.instruccionEspecial,
      };
    }
  }

  /**
   * @Metodo Descarga la orden de compra en formato PDF
   */
  descargarPdf(): void {
    const html = document.getElementById('orden-compra');
    const nombreArchivo = `orden de compra ${this.numeroOrden}.pdf`;
    this.pdfService.descargarPdf(html, nombreArchivo);
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
          (proveedor: Proveedor) => proveedor.id == this.proveedor.idProveedor
        )[0];

        this.proveedor.valor.map((producto: any) => {
          this.subtotal +=
            producto.precioCompra * producto.cantidadCompra -
            IVA * (producto.precioCompra * producto.cantidadCompra);

          this.total += producto.precioCompra * producto.cantidadCompra;
          this.descuento += producto.descuento * producto.precioCompra;
        });

        this.totaFormat = formateoMoneda(this.total);
        this.subtotalFormat = formateoMoneda(this.subtotal);
        this.descuentoFormat = formateoMoneda(this.descuento);

        this.ordenCompraInfo = {
          representanteVendedor:
            this.proveedor.representante || 'Sin representante',
          telefonoVendedor: this.proveedorInfo.telefono,
          correoVendedor: this.proveedorInfo.correo,
          direccionVendedor: this.proveedorInfo.domicilio,
          representanteComprador: REPRESENTANTE,
          telefonoComprador: TELEFONO_EMPRESA,
          correoComprador: CORREO_EMPRESA,
          direccionComprador: DIRECCION_EMPRESA,
          instruccionEspecial: this.proveedor.instruccionEspecial || '',
        };
        this.ordenForm.patchValue({
          idProveedor: this.proveedor.idProveedor,
          representanteVendedor:
            this.proveedor.representante || 'Sin representante',
          telefonoVendedor: this.proveedorInfo.telefono,
          correoVendedor: this.proveedorInfo.correo,
          direccionVendedor: this.proveedorInfo.domicilio,
          representanteComprador: REPRESENTANTE,
          telefonoComprador: TELEFONO_EMPRESA,
          correoComprador: CORREO_EMPRESA,
          direccionComprador: DIRECCION_EMPRESA,
          instruccionEspecial: this.proveedor.instruccionEspecial || '',
          subtotal: this.subtotal,
          descuento: this.descuento,
          otros: this.otros,
          iva: IVA,
          total: this.total,
        });
      });
  }
}
