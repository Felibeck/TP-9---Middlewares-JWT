import type { Usuario } from "./usuario";

export type Comentario = {
    msj: string;
    cantLikes: number;
    user: Partial<Usuario>;
}