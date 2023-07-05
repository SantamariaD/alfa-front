import { InformacionFecha } from "./httpService";
import { Producto, ProductoVenta } from "./productos";

export interface Categoria extends InformacionFecha {
    id: number;
    categoria: string;
}

export interface EliminarCategoria {
    categoria: Categoria[];
    productos: ProductoVenta[];
}

export interface EliminarCategoriaCompra {
    categoria: Categoria[];
    productos: Producto[];
}