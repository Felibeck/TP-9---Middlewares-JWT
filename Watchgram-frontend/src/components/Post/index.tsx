import { useState } from 'react'
import './Post.css'
import type { PostType } from "../../types/post"

const Post = ({ post, mostrarHeader = true }: { post: PostType, mostrarHeader?: boolean }) => {
    const [liked, setLiked] = useState(false)

    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setLiked((prev) => !prev)
    }

    return (
        <div className="post">
            {mostrarHeader && (
                <div className="post-header">
                    <img src={post.usuario.fotoPerfil} alt="userFoto" />
                    <p>{post.usuario.username}</p>
                </div>
            )}

            <img src={post.foto} alt="postFoto" className="post-foto" />

            <div className="post-acciones">
                <div className="post-acciones-mini">
                    <img src={post.usuario.fotoPerfil} alt="userFoto" className="post-mini-avatar" />
                </div>
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
                <span>{post.comentarios?.length}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
            </div>
        </div>
    )
}

export default Post