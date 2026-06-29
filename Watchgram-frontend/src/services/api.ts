import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const obtenerPerfil = async () => {
  const response = await api.get('/usuarios/perfil')
  return response.data
}

export const actualizarPerfil = async (datos: any) => {
  const response = await api.put('/usuarios/perfil', datos)
  return response.data
}

export const obtenerPublicaciones = async () => {
  const response = await api.get('/publicaciones')
  return response.data
}

export const crearPublicacion = async (datos: any) => {
  const response = await api.post('/publicaciones', datos)
  return response.data
}

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const register = async (email: string, nombre_usuario: string, nombre_completo: string, password: string) => {
  const response = await api.post('/auth/register', { email, nombre_usuario, nombre_completo, password })
  return response.data
}

export default api
