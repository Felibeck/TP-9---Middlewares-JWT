export type Usuario = {
    nombreCompleto:string;
    username: string;
    fotoPerfil: string;
    biografia: string;
    cantPublicaciones: number;
    cantSeguidores: number;
    cantSeguidos: number;
}

export type usuarioHistoria = {
    fotoPerfil: string;
    username: string;
}