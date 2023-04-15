export interface UsuarioInterface {
    id: number;
    username: string;
    email: string;
    rol: string;
    login: boolean;
    email_verified_at?: boolean;
    informacion:infoUsuarioInterface;
}

export interface infoUsuarioInterface{
    area?:string,
    extension?:string,
    activo?:boolean,
    nombres?:string,
    apellidoPaterno?:string,
    apellidoMaterno?:string,
    fechaNacimiento?:string,
    genero?:string,
    edad?:number,
    curp?:string,
    rfc?:string,
    nss?:string,
    numeroTelefonico?:number,
    numeroEmpleado?:string,
    salario?:string,
    puesto?:string,
    jefeDirecto?:string,
    regimenFiscal?:string,
    calle?:string,
    numeroExterior?:string,
    numeroInterior?:string,
    colonia?:string,
    municipio?:string,
    estado?:string,
    codigoPostal?:string	
}