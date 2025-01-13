<template>
  <div class="flex flex-col gap-4 lg:gap-6">
    <h1 class="text-lg font-semibold md:text-2xl">Parolni o'zgartirish</h1>
    <div class="">
      <VForm @submit="handleSubmitForm" v-slot="{ errors }">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="flex flex-col gap-2" v-if="!isAdmin">
            <VField name="password" rules="required" v-model="form.password">
              <UiLabel for="password"> Hozirgi parol </UiLabel>
              <div class="relative">
                <UiInput v-model="form.password" id="password" :type="passwordField ? 'text' : 'password'" placeholder="Parolni kiriting" class="pr-10" :error="errors.password" />
                <span class="absolute inset-y-0 end-0 flex cursor-pointer items-center justify-center px-4" @click="passwordSee">
                  <svg class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="!passwordField">
                    <path
                      d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.8198 5.76998C16.0698 4.44998 14.0698 3.72998 11.9998 3.72998C8.46984 3.72998 5.17984 5.80998 2.88984 9.40998C1.98984 10.82 1.98984 13.19 2.88984 14.6C3.67984 15.84 4.59984 16.91 5.59984 17.77"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.41992 19.5302C9.55992 20.0102 10.7699 20.2702 11.9999 20.2702C15.5299 20.2702 18.8199 18.1902 21.1099 14.5902C22.0099 13.1802 22.0099 10.8102 21.1099 9.40018C20.7799 8.88018 20.4199 8.39018 20.0499 7.93018"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path d="M15.5104 12.7002C15.2504 14.1102 14.1004 15.2602 12.6904 15.5202" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9.47 14.5298L2 21.9998" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M22.0003 2L14.5303 9.47" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <svg class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="passwordField">
                    <path
                      d="M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.9998 20.2702C15.5298 20.2702 18.8198 18.1902 21.1098 14.5902C22.0098 13.1802 22.0098 10.8102 21.1098 9.40021C18.8198 5.80021 15.5298 3.72021 11.9998 3.72021C8.46984 3.72021 5.17984 5.80021 2.88984 9.40021C1.98984 10.8102 1.98984 13.1802 2.88984 14.5902C5.17984 18.1902 8.46984 20.2702 11.9998 20.2702Z"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </VField>
          </div>
          <div v-if="!isAdmin"></div>
          <div class="flex flex-col gap-2">
            <VField name="newPassword" rules="required" v-model="form.newPassword">
              <UiLabel for="newPassword"> Yangi parol </UiLabel>
              <div class="relative">
                <UiInput v-model="form.newPassword" id="newPassword" :type="newPasswordField ? 'text' : 'password'" placeholder="Yangi parolni kiriting" class="pr-10" :error="errors.newPassword" />
                <span class="absolute inset-y-0 end-0 flex cursor-pointer items-center justify-center px-4" @click="newPasswordSee">
                  <svg class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="!newPasswordField">
                    <path
                      d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.8198 5.76998C16.0698 4.44998 14.0698 3.72998 11.9998 3.72998C8.46984 3.72998 5.17984 5.80998 2.88984 9.40998C1.98984 10.82 1.98984 13.19 2.88984 14.6C3.67984 15.84 4.59984 16.91 5.59984 17.77"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.41992 19.5302C9.55992 20.0102 10.7699 20.2702 11.9999 20.2702C15.5299 20.2702 18.8199 18.1902 21.1099 14.5902C22.0099 13.1802 22.0099 10.8102 21.1099 9.40018C20.7799 8.88018 20.4199 8.39018 20.0499 7.93018"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path d="M15.5104 12.7002C15.2504 14.1102 14.1004 15.2602 12.6904 15.5202" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9.47 14.5298L2 21.9998" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M22.0003 2L14.5303 9.47" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <svg class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="newPasswordField">
                    <path
                      d="M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.9998 20.2702C15.5298 20.2702 18.8198 18.1902 21.1098 14.5902C22.0098 13.1802 22.0098 10.8102 21.1098 9.40021C18.8198 5.80021 15.5298 3.72021 11.9998 3.72021C8.46984 3.72021 5.17984 5.80021 2.88984 9.40021C1.98984 10.8102 1.98984 13.1802 2.88984 14.5902C5.17984 18.1902 8.46984 20.2702 11.9998 20.2702Z"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </VField>
          </div>
          <div class="flex flex-col gap-2">
            <VField name="newConfirmPassword" rules="required|confirmed:@newPassword" v-model="form.newConfirmPassword">
              <UiLabel for="newConfirmPassword"> Yangi parolni takrorlang </UiLabel>
              <div class="relative">
                <UiInput
                  v-model="form.newConfirmPassword"
                  id="newConfirmPassword"
                  :type="newConfirmPasswordField ? 'text' : 'password'"
                  placeholder="Yangi parolni takrorlang"
                  class="pr-10"
                  :error="errors.newConfirmPassword"
                />
                <span class="absolute inset-y-0 end-0 flex cursor-pointer items-center justify-center px-4" @click="newConfirmPasswordSee">
                  <svg class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="!newConfirmPasswordField">
                    <path
                      d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.8198 5.76998C16.0698 4.44998 14.0698 3.72998 11.9998 3.72998C8.46984 3.72998 5.17984 5.80998 2.88984 9.40998C1.98984 10.82 1.98984 13.19 2.88984 14.6C3.67984 15.84 4.59984 16.91 5.59984 17.77"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.41992 19.5302C9.55992 20.0102 10.7699 20.2702 11.9999 20.2702C15.5299 20.2702 18.8199 18.1902 21.1099 14.5902C22.0099 13.1802 22.0099 10.8102 21.1099 9.40018C20.7799 8.88018 20.4199 8.39018 20.0499 7.93018"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path d="M15.5104 12.7002C15.2504 14.1102 14.1004 15.2602 12.6904 15.5202" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9.47 14.5298L2 21.9998" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M22.0003 2L14.5303 9.47" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <svg class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="newConfirmPasswordField">
                    <path
                      d="M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.9998 20.2702C15.5298 20.2702 18.8198 18.1902 21.1098 14.5902C22.0098 13.1802 22.0098 10.8102 21.1098 9.40021C18.8198 5.80021 15.5298 3.72021 11.9998 3.72021C8.46984 3.72021 5.17984 5.80021 2.88984 9.40021C1.98984 10.8102 1.98984 13.1802 2.88984 14.5902C5.17984 18.1902 8.46984 20.2702 11.9998 20.2702Z"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </VField>
          </div>
        </div>
        <div class="flex justify-end">
          <UiButton type="submit" class="mt-3" :loading="loading"> Saqlash </UiButton>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script setup>
  import { useCustomToast } from "@/composables/useCustomToast.js";
  import { useProfileStore } from "@/stores/profile.js";
  import { useRoute } from "vue-router";

  const props = defineProps({
    isAdmin: {
      type: Boolean,
      default: false,
    },
  });

  const route = useRoute();
  const userRole = useCookie("role");

  const { showToast } = useCustomToast();

  const profileStore = useProfileStore();

  const { updatePassword, updatePasswordByRole } = profileStore;
  const { loading } = storeToRefs(profileStore);

  const form = reactive({
    password: "",
    newPassword: "",
    newConfirmPassword: "",
  });

  const passwordField = ref(false);
  const newPasswordField = ref(false);
  const newConfirmPasswordField = ref(false);

  const passwordSee = () => {
    passwordField.value = !passwordField.value;
  };

  const newPasswordSee = () => {
    newPasswordField.value = !newPasswordField.value;
  };

  const newConfirmPasswordSee = () => {
    newConfirmPasswordField.value = !newConfirmPasswordField.value;
  };

  const handleSubmitForm = async () => {
    try {
      let res;
      if (props.isAdmin) {
        res = await updatePasswordByRole(route.params.userRole, route.query.userId, {
          password: form.newPassword,
        });
      } else {
        res = await updatePassword(userRole.value, {
          old: form.password,
          new: form.newPassword,
        });
      }
      if (res?.status === "success") {
        showToast("Parol muvaffaqiyatli yangilandi", "success");
        form.password = "";
        form.newPassword = "";
        form.newConfirmPassword = "";
      }
    } catch (error) {
      showToast(error?.response?.data?.error || "Parolni yangilashda xatolik yuz berdi", "error");
    }
  };
</script>
