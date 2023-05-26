export interface Producto {
    nombre: string;
    descripcion: string;
    codigo: string;
    categoria: string;
    proveedor: string;
    precioCompra: string;
    precioVenta: string;
    cantidadStock: string;
    ventas:number;
    fechaCompra: string;
    imagen?:string;
    agotado?: boolean;
}