import { useApi } from '@/composables/useApi';
import dayjs from 'dayjs';
import { defineStore } from 'pinia';
import { ref } from 'vue';





export const useProfileStore = defineStore('profile', () => {
  const api = useApi()
  const loading = ref(false)
  const user = ref({})
  const otherUser = ref({})

  const userRole = useCookie('role')

  const userRoleApiPath = {
    school: 'schools',
    teacher: 'teachers',
    pupil: 'pupils',
    default: 'users',
  }
  const getProfile = async (role) => {
    try {
      const apiPath = userRoleApiPath[role]
      const url = `${apiPath}/me`
      const response = await api.get(url)
      fillUserData(response.data)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const getProfileByRole = async (role, id) => {
    try {
      const url = `schools/${role}/${id}`
      const response = await api.get(url)
      fillUserData(response.data, role, id)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const updateProfile = async (role, form) => {
    loading.value = true
    try {
      const apiPath = userRoleApiPath[role]
      const response = await api.post(`${apiPath}/profile`, form)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const updateProfileByRole = async (role, id, form) => {
    loading.value = true
    try {
      const response = await api.put(`/schools/${role}/${id}`, form)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const updatePassword = async (role, form) => {
    loading.value = true
    try {
      const apiPath = userRoleApiPath[role]
      const url = `${apiPath}/reset-password`
      const response = await api.post(url, form)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const updatePasswordByRole = async (role, id, form) => {
    loading.value = true
    try {
      const response = await api.post(`/schools/${role}/update-password/${id}`, form)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const fillUserData = (userData, id, byrole) => {
    const isSchool = userRole.value === 'school'
    const data = userData.data || {}
    if (id) {
      otherUser.value = {
        login: data.login || '',
        name: data.name || '',
        surname: data.surname || '',
        father_name: data.father_name || '',
        phone_number: cleanPhoneNumber(data.phone_number) || '',
      }
      const schoolData = data.school || {}
      otherUser.value.region = schoolData.region || ''
      otherUser.value.district = schoolData.district || ''
      otherUser.value.school = `${schoolData.number || ''} - ${schoolData.type || ''}`.trim() || ''
      otherUser.value.tariff = schoolData.tarif ? dayjs(schoolData.tarif).format('DD.MM.YYYY HH:mm:ss') : ''

      if (byrole === 'pupil') {
        otherUser.value.class = `${data.class?.number || ''}${data.class?.letter || ''}`.trim() || ''
      }
    } else {
      user.value = {
        login: data.login || '',
        name: isSchool ? data.admin?.name || '' : data.name || '',
        surname: isSchool ? data.admin?.surname || '' : data.surname || '',
        father_name: isSchool ? data.admin?.father_name || '' : data.father_name || '',
        phone_number: cleanPhoneNumber(isSchool ? data.admin?.phone_number : data.phone_number) || '',
      }
      if (isSchool) {
        user.value.region = data.region || ''
        user.value.district = data.district || ''
        user.value.school = `${data.number || ''} - ${data.type || ''}`.trim() || ''
        user.value.tariff = data.tarif ? dayjs(data.tarif).format('DD.MM.YYYY HH:mm:ss') : ''
      } else {
        const schoolData = data.school || {}
        user.value.region = schoolData.region || ''
        user.value.district = schoolData.district || ''
        user.value.school = `${schoolData.number || ''} - ${schoolData.type || ''}`.trim() || ''
        user.value.tariff = schoolData.tarif ? dayjs(schoolData.tarif).format('DD.MM.YYYY HH:mm:ss') : ''
        if (userRole.value === 'pupil') {
          user.value.class = `${data.class?.number || ''}${data.class?.letter || ''}`.trim() || ''
          user.value.classNumber = `${data.class?.number || ""}`.trim() || ''

        }
      }
    }
  }

  const fullUserDetails = computed(() => {
    const { surname, name, father_name } = user.value || {}
    return surname && name ? `${surname} ${name} ${father_name || ''}`.trim() : ''
  })

  const userFullName = computed(() => {
    const { surname, name } = user.value || {}
    return surname && name ? `${surname} ${name}` : ''
  })

  const userInitials = computed(() => {
    const { surname, name } = user.value || {}
    return surname && name ? `${surname.charAt(0)}${name.charAt(0)}` : ''
  })

  return {
    user,
    otherUser,
    fullUserDetails,
    userFullName,
    userInitials,
    getProfile,
    getProfileByRole,
    updateProfile,
    updateProfileByRole,
    updatePassword,
    updatePasswordByRole,
    loading,
  }
})