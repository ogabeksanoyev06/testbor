export default defineNuxtRouteMiddleware(async (to, from) => {
  const accessToken = useCookie('access_token')
  const userRole = useCookie('role')

  const localePath = useLocalePath()

  if (!accessToken.value || !userRole.value) {
    if (to.path !== localePath('/auth/login')) {
      accessToken.value = null
      userRole.value = null
      return navigateTo(localePath('/auth/login'))
    }
  }

  if (accessToken.value && userRole.value && to.path === localePath('/auth/login')) {
    return navigateTo(localePath('/'))
  }
})
