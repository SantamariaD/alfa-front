export interface CatalogoProveedor {
    id: number;
    idProveedor: number;
    idProducto: number;
    precioMaximoVenta: number;
    precioCompra: number;
    politicasVenta: string;
    nombreProducto: string;
    nombreProveedor: string;
    imagen: string;
    cantidadCompra: number;
    descuento: number;
}

export interface BotonCarrito {
    nombreProducto: string;
    idProveedor: number;
}