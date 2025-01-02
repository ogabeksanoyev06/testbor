import axios from 'axios'

export const useApi = () => {
  const config = useRuntimeConfig()

  const localePath = useLocalePath()

  const accessToken = useCookie('access_token')
  const userRole = useCookie('role')

  const api = axios.create({
    baseURL: config.public.apiBaseUrl,
    headers: { 'Content-Type': 'application/json' },
  })

  api.interceptors.request.use(
    (reqConfig) => {
      if (accessToken.value) {
        reqConfig.headers['Authorization'] = `Bearer ${accessToken.value}`
      }
      return reqConfig
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        accessToken.value = null
        userRole.value = null
        return navigateTo(localePath('/auth/login'))
      }
      return Promise.reject(error)
    }
  )

  return api
}
