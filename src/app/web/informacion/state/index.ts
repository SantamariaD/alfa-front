import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUsuario from './usuario/usuario.reducer';
import * as fromHttp from './cargandoPeticion/cargandoPeticion.reducer';
import * as fromCarrito from './carrito/carrito.reducer';
import * as fromAreas from './areas/areas.reducer';
import * as fromProductos from './productos/productos.reducer';
import * as fromProveedores from './proveedores/proveedores.reducer';
import * as fromEmpleados from './empleados/empleados.reducer';
import * as fromOrdenesCompra from './ordenesCompra/ordenesCompra.reducer';
import * as fromCategorias from './categorias/categorias.reducer';
import * as fromSucursales from './sucursales/sucursales.reducer';
import * as fromCategoriasVentas from './categoriasVentas/categoriasVentas.reducer';
import * as fromStockVenta from './stockVentas/stockVentas.reducer';
import * as fromProductosCompraVenta from './productosCompraVenta/productosCompraVenta.reducer';
import * as fromTickets from './ticket/ticket.reducer';
import { UsuarioInterface } from '../interface/usuario';
import { CargandoPeticionInterface } from '../interface/httpService';
import {
  CatalogoProveedor,
  ConsultaOrdenCompra,
} from '../interface/catalogo-proveedores';
import { Area } from '../interface/areas';
import { Producto, ProductoVenta } from '../interface/productos';
import { ProveedoresStore } from '../interface/proveedores';
import { Categoria } from '../interface/categorias';
import { EmpleadosStore } from '../interface/empleados';
import { ConsultaSucursales } from '../interface/sucursales';
import { TicketInfo } from '../interface/ticket';

export interface AppState {
  usuario: UsuarioInterface;
  cargandoPeticion: CargandoPeticionInterface;
  carrito: Array<CatalogoProveedor>;
  areas: Array<Area>;
  categorias: Array<Categoria>;
  categoriasVentas: Array<Categoria>;
  productos: Array<Producto>;
  productosCompraVenta: Array<Producto>;
  proveedores: ProveedoresStore;
  empleados: EmpleadosStore;
  ordenesCompra: Array<ConsultaOrdenCompra>;
  sucursales: Array<ConsultaSucursales>;
  stockVenta: Array<ProductoVenta>;
  ticketInfo: TicketInfo;
}

export const appReducers: ActionReducerMap<AppState> = {
  usuario: fromUsuario.reducer,
  cargandoPeticion: fromHttp.reducer,
  carrito: fromCarrito.reducer,
  areas: fromAreas.reducer,
  productos: fromProductos.reducer,
  proveedores: fromProveedores.reducer,
  empleados: fromEmpleados.reducer,
  ordenesCompra: fromOrdenesCompra.reducer,
  categorias: fromCategorias.reducer,
  sucursales: fromSucursales.reducer,
  categoriasVentas: fromCategoriasVentas.reducer,
  stockVenta: fromStockVenta.reducer,
  productosCompraVenta: fromProductosCompraVenta.reducer,
  ticketInfo: fromTickets.reducer
};

//*********SELECTORES******/

//***** Features selectores****/

// Spinn cargando
export const selectCargandoPeticion =
  createFeatureSelector<CargandoPeticionInterface>('cargandoPeticion');

// Login
export const selectLoginPeticion =
  createFeatureSelector<UsuarioInterface>('login');

//usuario
export const selectUsuarioPeticion =
  createFeatureSelector<UsuarioInterface>('usuario');

//Carrito
export const selectCarrito =
  createFeatureSelector<Array<CatalogoProveedor>>('carrito');

//Areas
export const selectAreas = createFeatureSelector<Array<Area>>('areas');

//Productos
export const selectProductos =
  createFeatureSelector<Array<Producto>>('productos');

//Stock ventas
export const selectStockVenta =
  createFeatureSelector<Array<ProductoVenta>>('stockVenta');

//Empleados
export const selectEmpleados =
  createFeatureSelector<EmpleadosStore>('empleados');

//Proveedores
export const selectProveedores =
  createFeatureSelector<ProveedoresStore>('proveedores');

//ordenes de compra
export const selectOrdenesCompra =
  createFeatureSelector<Array<ConsultaOrdenCompra>>('ordenesCompra');

//Categoria
export const selectCategorias =
  createFeatureSelector<Array<Categoria>>('categorias');

//Categorias Ventas
export const selectCategoriasVentas =
  createFeatureSelector<Array<Categoria>>('categoriasVentas');

//Sucursales
export const selectSucursales =
  createFeatureSelector<Array<ConsultaSucursales>>('sucursales');

//Tickets
export const selectTicketInfo =
  createFeatureSelector<TicketInfo>('ticketInfo');

//****** Creando selectores*****/
//Productos Compra Venta
export const selectProductosCompraVenta = createFeatureSelector<
  Producto[]
>('productosCompraVenta');

export const selectBanderaCargandoPeticion = createSelector(
  selectCargandoPeticion,
  (state: CargandoPeticionInterface) => state.cargandoPeticion
);

// Login
export const selectBanderaLoginPeticion = createSelector(
  selectLoginPeticion,
  (state: UsuarioInterface) => state.login
);

export const selectInfoUsuarioPeticion = createSelector(
  selectUsuarioPeticion,
  (state: UsuarioInterface) => state
);

// Carrito
export const selectCarritoCompra = createSelector(
  selectCarrito,
  (state: Array<CatalogoProveedor>) => state
);

// Areas
export const selectAreasGuardadas = createSelector(
  selectAreas,
  (state: Array<Area>) => state
);

// Productos
export const selectProductosStore = createSelector(
  selectProductos,
  (state: Array<Producto>) => state
);

// Stock Venta
export const selectStockVentasStore = createSelector(
  selectStockVenta,
  (state: Array<ProductoVenta>) => state
);

// Empleados
export const selectEmpleadosStore = createSelector(
  selectEmpleados,
  (state: EmpleadosStore) => state
);

// Proveedores
export const selectProveedoresStore = createSelector(
  selectProveedores,
  (state: ProveedoresStore) => state
);

// Proveedores
export const selectOrdenesCompraStore = createSelector(
  selectOrdenesCompra,
  (state: Array<ConsultaOrdenCompra>) => state
);

// Categoria
export const selectCategoriasStore = createSelector(
  selectCategorias,
  (state: Array<Categoria>) => state
);

// Categorias ventas
export const selectCategoriasVentasStore = createSelector(
  selectCategoriasVentas,
  (state: Array<Categoria>) => state
);

// Sucursale
export const selectSucursalesStore = createSelector(
  selectSucursales,
  (state: Array<ConsultaSucursales>) => state
);

// Productos Compra Venta
export const selectProductosCompraVentaStore = createSelector(
  selectProductosCompraVenta,
  (state: Producto[]) => state
);

// Ticket
export const selectSelectTicketInfoStore = createSelector(
  selectTicketInfo,
  (state: TicketInfo) => state
);


