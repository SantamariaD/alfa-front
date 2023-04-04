export interface UsuarioInterface {
    id: number;
    name: string;
    username: string;
    email: string;
    rol: string;
    login: boolean;
    imagen: string;
    email_verified_at?: boolean;
}