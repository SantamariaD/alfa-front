import { Action, createReducer, on } from "@ngrx/store";
import { UsuarioInterface } from "src/app/web/informacion/interface/usuario";
import { guardarUsuario } from "./usuario.action";


const estadoInicial: UsuarioInterface = {
    id: 0,
    name: '',
    email: '',
    username: '',
    rol: '',
    imagen: '',
    login: false
}

const usuarioReducer = createReducer(
    estadoInicial,
    on(guardarUsuario, (state, { usuario }) => {
        return {
            ...state,
            ...usuario
        };
    }),
)

export function reducer(state: UsuarioInterface | undefined, action: Action): UsuarioInterface {
    return usuarioReducer(state, action);
}