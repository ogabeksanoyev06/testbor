import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useReportsStore = defineStore('reports', () => {
  const api = useApi()
  const loading = ref(false)

  const userRoleApiPath = {
    school: 'schools',
    teacher: 'teachers',
    pupil: 'pupils',
    default: 'users',
  }

  const getReports = async (role, params) => {
    try {
      loading.value = true
      const apiPath = userRoleApiPath[role]
      const response = await api.get(`schools/${apiPath}`, { params })
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  return { getReports }
})
