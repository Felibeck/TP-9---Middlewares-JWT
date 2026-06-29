import { useState } from 'react'
import type { PostType } from "../../types/post"
import ComentarioItem from "../ComentarioItem"
import type { Comentario } from "../../types/comentarioType"
import './PostDetalleModal.css'

const comentariosFicticios: Comentario[] = [
  { msj: '¡Muy bueno!', cantLikes: 5, user: { username: 'user_name', fotoPerfil: 'https://i.pravatar.cc/40?img=1' } },
  { msj: '¡Muy bueno!', cantLikes: 5, user: { username: 'user_name', fotoPerfil: 'https://i.pravatar.cc/40?img=2' } },
  { msj: '¡Muy bueno!', cantLikes: 5, user: { username: 'user_name', fotoPerfil: 'https://i.pravatar.cc/40?img=3' } },
  { msj: '¡Buen ángulo!', cantLikes: 5, user: { username: 'user_name', fotoPerfil: 'https://i.pravatar.cc/40?img=4' } },
]

const PostDetalleModal = ({ post, onClose }: { post: PostType, onClose: () => void }) => {
  const [liked, setLiked] = useState(false)
  const cantLikesMostrado = post.cantLikes + (liked ? 1 : 0)

  const handleLikeClick = () => {
    setLiked((prev) => !prev)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <button className="modal-cerrar" onClick={onClose}>✕</button>

        <div className="modal-header">
          <img src={post.usuario.fotoPerfil} alt="perfil" className="modal-header-img" />
          <span className="modal-header-username">@{post.usuario.username}</span>
        </div>

        <div className="modal-body">
          <div className="modal-foto-wrapper">
            <img src={post.foto} alt="post" className="modal-foto" />
          </div>

          <div className="modal-comentarios">
            <div className="modal-descripcion">
              <img src={post.usuario.fotoPerfil} alt="perfil" className="modal-descripcion-avatar" />
              <p>
                <span className="modal-descripcion-username">{post.usuario.username}</span>
                {post.descripcion ?? 'Un reloj que combina elegancia y precisión, perfecto para cualquier ocasión.'}
              </p>
            </div>

            <div className="modal-comentarios-lista">
              {comentariosFicticios.map((c, i) => (
                <ComentarioItem key={i} msj={c.msj} cantLikes={c.cantLikes} user={c.user} />
              ))}
            </div>

            <div className="modal-acciones">
              <svg
                className={liked ? 'icon-like liked' : 'icon-like'}
                onClick={handleLikeClick}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={liked ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
            <p className="modal-likes">{cantLikesMostrado} likes</p>

            <textarea className="comentario-textarea" placeholder="Escribe aquí tu comentario..." />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetalleModal