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
  traerEmpleados:'/empleados/consultar-empleados',
  traerEmpleado:'/empleados/consultar-empleado',
  guardarEmpleado:'/empleados/guardar-empleado',
  actualizarEmpleado:'/empleados/actualizar-empleado',
  eliminarEmpleado:'empleados/eliminar-empleado'
}
};
