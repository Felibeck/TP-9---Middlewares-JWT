import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import Perfil from './components/Perfil'
import Feed from './components/Feed'
import PostDetalleModal from './components/PostDetalleModal'
import { fetchFeed } from './services/unsplash'
import { obtenerPerfil } from './services/api'
import type { PostType } from './types/post'
import type { Usuario } from './types/usuario'

const Profile = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [posts, setPosts] = useState<PostType[]>([])
  const [postSeleccionado, setPostSeleccionado] = useState<PostType | null>(null)

  useEffect(() => {
    obtenerPerfil()
      .then((data) => {
        setUsuario({
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

    fetchFeed(5, 'luxury watch').then((results) => {
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
  }, [])

  return (
    <>
      {/* Header */}
      <div className="header">
        <Link to="/home" className="logo">WatchGram</Link>
        <SearchBar />
      </div>

      {/* Perfil */}
      {usuario && <Perfil usuario={usuario} />}

      {/* Posts */}
      <Feed listaPosts={posts} onPostClick={setPostSeleccionado} mostrarHeader={false} />

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

export default Profile