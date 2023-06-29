export interface Calendario {
    id: number;
    idUser: number;
    dia: number;
    mes: number;
    ano: number;
    contenido: string;
    tipo: string;
    resuelto: boolean;
}