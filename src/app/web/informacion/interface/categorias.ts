import { InformacionFecha } from "./httpService";

export interface Categoria extends InformacionFecha {
    id: number;
    categoria: string;
}