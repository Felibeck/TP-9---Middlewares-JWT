import { useState, useEffect } from 'react'
import './App.css'
import Feed from './components/Feed'
import Historia from './components/Historia'
import SearchBar from './components/SearchBar'
import PostDetalleModal from './components/PostDetalleModal'
import { fetchFeed } from './services/unsplash'
import { obtenerPerfil } from './services/api'
import type { PostType } from './types/post'
import type { usuarioHistoria } from './types/usuario'
import type { Usuario } from './types/usuario'
import { Link } from 'react-router-dom'

function App() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [historias, setHistorias] = useState<usuarioHistoria[]>([])
  const [postSeleccionado, setPostSeleccionado] = useState<PostType | null>(null)
  const [usuarioPerfil, setUsuarioPerfil] = useState<Usuario | null>(null)

  useEffect(() => {
    obtenerPerfil()
      .then((data) => {
        setUsuarioPerfil({
          nombreCompleto: data.nombre_completo,
          username: data.nombre_usuario,
          fotoPerfil: data.foto_perfil || 'https://via.placeholder.com/150',
          biografia: data.biografia || 'Sin biografía',
          cantPublicaciones: data.publicaciones?.length || 0,
          cantSeguidores: 0,
          cantSeguidos: 0,
        })
      })
      .catch((err) => console.error('Error al obtener perfil:', err))

    fetchFeed(10, 'luxury watch').then((results) => {
      const mapped: PostType[] = results.map((r: any) => ({
        foto: r.urls.regular,
        cantLikes: r.likes,
        comentarios: [],
        usuario: {
          username: r.user.username,
          fotoPerfil: r.user.profile_image.medium,
          nombreCompleto: r.user.name,
        },
      }))
      setPosts(mapped)
    })

    fetchFeed(5, 'person portrait').then((results) => {
      const mapped: usuarioHistoria[] = results.map((r: any) => ({
        username: r.user.username,
        fotoPerfil: r.user.profile_image.medium,
      }))
      setHistorias(mapped)
    })
  }, [])

  return (
    <>
      {/* Header */}
      <div className="header">
        <span className="logo">WatchGram</span>
        <SearchBar />
      </div>

      <div className="contenido">
        <div className="fila-superior">
          {/* Perfil lateral fijo */}
          {usuarioPerfil && (
            <div className="perfil-lateral">
              <Link to="/profile">
                <img src={usuarioPerfil.fotoPerfil} alt="perfil" />
                <p>{usuarioPerfil.nombreCompleto}</p>
                <span>{usuarioPerfil.username}</span>
              </Link>
            </div>
          )}

          <div className="stories-container">
            <h3>STORIES</h3>
            <div className="stories-list">
              {historias.map((h, i) => (
                <Historia key={i} fotoPerfil={h.fotoPerfil} username={h.username} />
              ))}
            </div>
          </div>
        </div>

        <div className="posts-container">
          <h3>POSTS</h3>
          <Feed listaPosts={posts} onPostClick={setPostSeleccionado} mostrarHeader={false} />
        </div>
      </div>

      {/* Modal */}
      {postSeleccionado && (
        <PostDetalleModal
          post={postSeleccionado}
          onClose={() => setPostSeleccionado(null)}
        />
      )}
    </>
  )
}

export default App