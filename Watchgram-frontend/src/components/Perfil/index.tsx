import './Perfil.css'
import type { Usuario } from "../../types/usuario"

const Perfil = ({ usuario }: { usuario: Usuario }) => {
    return (
        <div className="perfil">
            <div className="perfil-foto-wrapper">
                <img src={usuario.fotoPerfil} alt="userFoto" className="perfil-foto" />
            </div>
            <div className="perfil-info">
                <div className="perfil-nombre">
                    <h1>{usuario.nombreCompleto}</h1>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#4a9eff">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#4a9eff" strokeWidth="2" fill="none"/>
                    </svg>
                </div>
                <p className="perfil-username">@{usuario.username}</p>
                <p className="perfil-bio">"{usuario.biografia}"</p>
                <div className="perfil-stats">
                    <p><span>{usuario.cantSeguidores}</span> seguidores</p>
                    <p><span>{usuario.cantSeguidos}</span> seguidos</p>
                </div>
                <p className="perfil-posts-count">{usuario.cantPublicaciones} posts</p>
            </div>

            <button className="perfil-editar-btn" type="button" aria-label="Editar perfil">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
                    <path d="M16.5 14.5l4 4M20.5 14.5l-4 4" />
                </svg>
            </button>
        </div>
    )
}

export default Perfil