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
}