<template>
  <div class="flex h-screen items-center justify-between">
    <div class="w-full md:w-1/2">
      <div class="mx-auto w-full max-w-[500px] px-4">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Tizimga kirish</h1>
        <p class="mb-6 mt-1 text-muted-foreground">Hurmatli foydalanuvchi, tizimga kirish uchun quyidagi ma'lumotlarni kiriting.</p>
        <VForm @submit="loginToSystem" v-slot="{ errors }">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <VField name="login" rules="required" v-model="form.login">
                <UiLabel for="login"> Login </UiLabel>
                <UiInput v-model="form.login" id="login" type="text" placeholder="Loginni kiriting" :error="errors.login" />
              </VField>
            </div>
            <div class="grid gap-2">
              <VField name="password" rules="required" v-model="form.password">
                <UiLabel for="password"> Parol </UiLabel>
                <div class="relative">
                  <UiInput v-model="form.password" id="password" :type="passwordField ? 'text' : 'password'" placeholder="Parolni kiriting" class="pr-8" :error="errors.password" />
                  <span class="absolute inset-y-0 end-0 flex cursor-pointer items-center justify-center px-2" @click="passwordSee">
                    <Icon name="eye" class="h-4 w-4 text-muted-foreground" v-if="passwordField" />
                    <Icon name="eye-off" class="h-4 w-4 text-muted-foreground" v-else />
                  </span>
                </div>
              </VField>
            </div>
            <UiButton :loading="loading" type="submit" class="w-full"> Tizimga kirish </UiButton>
          </div>
        </VForm>
      </div>
    </div>
    <div class="hidden h-screen md:block md:w-1/2 lg:w-1/2">
      <img
        src="https://images.unsplash.com/photo-1512551980832-13df02babc9e?q=60&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Login form image"
        class="size-full object-cover"
      />
    </div>
  </div>
</template>

<script setup>
  import { useCustomToast } from "@/composables/useCustomToast.js";
  import { useAuthStore } from "@/stores/auth.js";

  definePageMeta({
    layout: "auth",
  });

  useSeoMeta({
    title: "Tizimga kirish",
    description: "Kirish uchun quyidagi ma'lumotlarni kiriting.",
  });

  const form = reactive({
    login: "",
    password: "",
  });

  const router = useRouter();
  const localePath = useLocalePath();

  const accessToken = useCookie("access_token");
  const userRole = useCookie("role");

  const { showToast } = useCustomToast();

  const authStore = useAuthStore();

  const { login } = authStore;
  const { loading } = storeToRefs(authStore);

  const userRoles = {
    s: "school",
    t: "teacher",
    p: "pupil",
    r: "region",
    d: "district",
  };

  const passwordField = ref(false);

  const passwordSee = () => {
    passwordField.value = !passwordField.value;
  };

  const loginToSystem = async () => {
    const loginTypeMap = {
      s: "schools/login",
      t: "teachers/login",
      p: "pupils/login",
      // r: 'regions/login',
      // d: 'districts/login',
      default: "users/login",
    };
    const loginType = form.login.charAt(0).toLowerCase();
    if (!loginTypeMap[loginType]) {
      showToast("Bunday roledagi foydalanuvchi mavjud emas", "error");
      return;
    }
    try {
      const response = await login(form);
      if (response.status === "success") {
        const loginType = form.login.charAt(0).toLowerCase();
        accessToken.value = response.data.token;
        userRole.value = userRoles[loginType];
        navigateTo(localePath("/"));
        showToast("Tizimga kirdingiz", "success");
      }
    } catch (error) {
      showToast(error.response?.data?.error, "error");
    }
  };
</script>
