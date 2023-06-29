export interface Calendario {
    id: number;
    idUser: number;
    dia: number;
    mes: number;
    ano: number;
    contenido: string;
    tipo: "error" | "success" | "warning";
    resuelto: boolean;
}

export interface CalendarioGuardar {
    idUser: number;
    fecha: any;
    contenido: string;
    tipo: string;
}

export interface CalendarioRespuesta extends CalendarioGuardar {
    id: number;
    resuelto: boolean;
}

export interface LlaveValorCalendario {
    key: string,
    value: Array<Calendario>
}