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
    consultarProducto: '/producto/consultar-producto',
    guardarProductos: '/producto/guardar-producto',
    actualizarProductos: '/producto/actualizar-producto',
    eliminarProductos: '/producto/eliminar-productos',
  },
  categorias: {
    consultarCategorias: '/categorias/consultar-categorias',
    crearCategorias: '/categorias/guardar-categoria',
    eliminarCategorias: '/categorias/eliminar-categoria',
  },
  empleados: {
    crearEmpleado:'/empleados/guardar-empleado',
    traerEmpleados: '/empleados/consultar-empleados',
    traerEmpleado: '/empleados/consultar-empleado',
    guardarEmpleado: '/empleados/guardar-empleado',
    actualizarEmpleado: '/empleados/actualizar-empleado',
    eliminarEmpleado: '/empleados/eliminar-empleado',
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
};
