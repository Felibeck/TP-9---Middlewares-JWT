import type { Comentario } from "../../types/comentarioType"
import './ComentarioItem.css'

const ComentarioItem = ({ msj, cantLikes, user }: Comentario) => {
    return (
        <div className="comentario">
            <div className="user">
                <img src={user.fotoPerfil} alt="Foto de usuario" className="foto-user" />
                <p className="user-name">{user.username}</p>
            </div>
            <p className="msj">{msj}</p>
            <span className="cantLikes">
                {cantLikes}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            </span>
        </div>
    )
}

export default ComentarioItem