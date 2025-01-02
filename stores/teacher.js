import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useTeacherStore = defineStore('teacher', () => {
  const api = useApi()

  const loading = ref({
    create: false,
    get: false,
    delete: false,
    update: false,
  })

  const createTeacher = async (data) => {
    try {
      loading.value.create = true
      const response = await api.post('schools/teacher', data)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value.create = false
    }
  }

  const getTeachers = async () => {
    try {
      const response = await api.get('schools/teacher')
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const getTeacherById = async (id) => {
    try {
      loading.value.get = true
      const response = await api.get(`schools/teacher/${id}`)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value.get = false
    }
  }

  const deleteTeacher = async (id) => {
    try {
      loading.value.delete = true
      const response = await api.delete(`schools/teacher/${id}`)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value.delete = false
    }
  }

  const updateTeacher = async (id, data) => {
    try {
      loading.value.update = true
      const response = await api.put(`schools/teacher/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value.update = false
    }
  }

  return {
    createTeacher,
    getTeachers,
    getTeacherById,
    deleteTeacher,
    updateTeacher,
    loading,
  }
})
