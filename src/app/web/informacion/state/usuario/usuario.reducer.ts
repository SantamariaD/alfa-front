import { Action, createReducer, on } from "@ngrx/store";
import { UsuarioInterface, infoUsuarioInterface } from "src/app/web/informacion/interface/usuario";
import { guardarUsuario,borraUsuario } from "./usuario.action";
import { state } from "@angular/animations";


const estadoInicial: UsuarioInterface = {
    id: 0,
    email: '',
    username: '',
    rol: '',
    login: false,
    informacion:{} as infoUsuarioInterface
}

const usuarioReducer = createReducer(
    estadoInicial,
    on(guardarUsuario, (state, { usuario }) => {
        return {
            ...state,
            ...usuario,
            informacion: { ...usuario.informacion},
            
        };
    }),
    // on(borraUsuario, (state , {}) =>{
    //     return {
    //         ...state,
    //         {}
    //     }
    // })
)

export function reducer(state: UsuarioInterface | undefined, action: Action): UsuarioInterface {
    return usuarioReducer(state, action);
}