import './Historia.css'
import type { usuarioHistoria } from "../../types/usuario"

const Historia = ({ fotoPerfil, username }: usuarioHistoria) => {
    return (
        <div className="historia">
            <div className="historia-foto-wrapper">
                <img src={fotoPerfil} alt="FotoHistoria" className="historia-img" />
            </div>
            <p className="historia-username">{username}</p>
        </div>
    )
}

export default Historia