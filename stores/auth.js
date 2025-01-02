import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import { useCustomToast } from '@/composables/useCustomToast.js'

export const useAuthStore = defineStore('auth', () => {
  const api = useApi()
  const router = useRouter()
  const { showToast } = useCustomToast()

  const localePath = useLocalePath()

  const accessToken = useCookie('access_token')
  const userRole = useCookie('role')
  const loading = ref(false)

  const login = async (form) => {
    loading.value = true
    try {
      const loginTypeMap = {
        s: 'schools/login',
        t: 'teachers/login',
        p: 'pupils/login',
        // r: 'regions/login',
        // d: 'districts/login',
        default: 'users/login',
      }
      const loginType = form.login.charAt(0).toLowerCase()
      const loginUrl = loginTypeMap[loginType] || loginTypeMap.default
      const response = await api.post(loginUrl, form)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    accessToken.value = null
    userRole.value = null
    router.push(localePath('/auth/login'))
    showToast('Tizimdan chiqdingiz', 'success')
  }

  return {
    login,
    logout,
    loading,
  }
})
