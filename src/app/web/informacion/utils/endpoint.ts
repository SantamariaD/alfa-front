export const ENDPOINTS = {
  documentos: {
    traerDocumentosArea: '/documentos/traer-documentos-area/administracion',
    traerTodosDocumentos: '/documentos/traer-documentos',
    guardarDocumentos: '/documentos/guardar-documento',
    actualizarDocumento: '/documentos/actualizar-documento',
    descargarDocumento: '/documentos/descargar-documento',
  },
  productos: {
    consultarProductos: '/producto/consultar-productos',
    consultarProductosVenta: '/producto/consultar-productos-venta',
    consultarProducto: '/producto/consultar-producto',
    guardarProductos: '/producto/guardar-producto',
    actualizarProductos: '/producto/actualizar-producto',
    eliminarProductos: '/producto/eliminar-producto',
  },
  categorias: {
    consultarCategorias: '/categorias/consultar-categorias',
    crearCategorias: '/categorias/guardar-categoria',
    eliminarCategorias: '/categorias/eliminar-categoria',
  },
  categoriasVentas: {
    consultarCategorias: '/categorias-ventas/consultar-categorias',
    crearCategorias: '/categorias-ventas/guardar-categoria',
    eliminarCategorias: '/categorias-ventas/eliminar-categoria',
  },
  empleados: {
    crearEmpleado: '/empleados/guardar-empleado',
    traerEmpleados: '/empleados/consultar-empleados',
    traerEmpleado: '/empleados/consultar-empleado',
    guardarEmpleado: '/empleados/guardar-empleado',
    actualizarEmpleado: '/empleados/actualizar-empleado',
    eliminarEmpleado: '/empleados/eliminar-empleado',
    traerDocumentosArea: '/empleados/traer-documentos-area/administracion',
    traerTodosDocumentos: '/empleados/traer-documentos',
    guardarDocumentos: '/empleados/guardar-documento',
    actualizarDocumento: '/empleados/actualizar-documento',
    descargarDocumento: '/empleados/descargar-documento',
  },
  proveedores: {
    consultarProveedores: '/proveedores/consultar-proveedores',
    consultarProveedor: '/proveedores/consultar-proveedor',
    guardarProveedor: '/proveedores/guardar-proveedor',
    actualizarProveedor: '/proveedores/actualizar-proveedor',
    eliminarProveedor: '/proveedores/eliminar-proveedor',
  },
  catalogoProveedores: {
    consultarCatalogos: '/catalogo-proveedores/consultar-catalogos',
    consultarCatalogo: '/catalogo-proveedores/consultar-catalogo',
    guardarCatalogo: '/catalogo-proveedores/guardar-catalogo',
    actualizarCatalogo: '/catalogo-proveedores/actualizar-catalogo',
    eliminarCatalogo: '/catalogo-proveedores/eliminar-catalogo',
  },
  areas: {
    consultarAreas: '/areas/consultar-areas',
  },
  ordenCompra: {
    guardarOrdenCompra: '/ordenes-compra/guardar-orden-compra',
    consultarOrdenesCompra: '/ordenes-compra/consultar-orden-compra',
  },
  productosOrdenCompra: {
    guardarOrdenCompra:
      '/productos-ordenes-compra/guardar-producto-orden-compra',
  },
  calendario: {
    consultarCalendarioUsuario: '/calendario/consultar-calendario-usuario',
    eliminarEventoCalendario: '/calendario/eliminar-evento-calendario',
    crearEventoCalendario: '/calendario/crear-evento-calendario',
  },
  sucursales: {
    consultarSucursales: '/sucursales/consultar-sucursales',
    eliminarScursal: '/sucursales/eliminar-sucursal',
    crearScursal: '/sucursales/crear-sucursal',
    actualizarScursal: '/sucursales/actualizar-sucursal',
  },
  stockVentas: {
    guardarProducto: '/stock-ventas/guardar-producto',
    actualizarProducto: '/stock-ventas/actualizar-producto',
    eliminarProducto: '/stock-ventas/eliminar-producto',
    consultarProductos: '/stock-ventas/consultar-productos'
  }
};
