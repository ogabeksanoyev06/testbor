<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-lg font-semibold md:text-2xl">Shaxsiy ma'lumotlar</h1>
    <VForm @submit="handleSubmitForm" v-slot="{ errors }">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div class="flex flex-col gap-2">
              <VField name="region">
                <UiLabel for="region"> Viloyat </UiLabel>
                <UiInput disabled v-model="form.region" id="region" type="text" placeholder="Viloyat" />
              </VField>
            </div>
            <div class="flex flex-col gap-2">
              <VField name="district">
                <UiLabel for="district"> Tuman/Shahar </UiLabel>
                <UiInput disabled v-model="form.district" id="district" type="text" placeholder="Tuman" />
              </VField>
            </div>
            <div class="flex flex-col gap-2">
              <VField name="school">
                <UiLabel for="school"> Maktab </UiLabel>
                <UiInput disabled v-model="form.school" id="school" type="text" placeholder="Maktab" />
              </VField>
            </div>
            <div class="flex flex-col gap-2" v-if="userRole === 'pupil' || route.params.userRole === 'pupil'">
              <VField name="class">
                <UiLabel for="class"> Sinf </UiLabel>
                <UiInput disabled v-model="form.class" id="class" type="text" placeholder="Sinf" />
              </VField>
            </div>
            <div class="flex flex-col gap-2">
              <VField name="tariff">
                <UiLabel for="tariff"> Tarif muddati </UiLabel>
                <UiInput disabled v-model="form.tariff" id="class" type="text" placeholder="Tarif" />
              </VField>
            </div>
            <div class="flex flex-col gap-2">
              <VField name="login">
                <UiLabel for="login"> Login </UiLabel>
                <UiInput disabled v-model="form.login" id="login" type="text" placeholder="Login" />
              </VField>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="flex flex-col gap-2">
              <VField name="name" rules="required" v-model="form.name">
                <UiLabel for="name"> Ism </UiLabel>
                <UiInput v-model="form.name" id="name" type="text" placeholder="Ism" :error="!!errors.name" />
              </VField>
            </div>
            <div class="flex flex-col gap-2">
              <VField name="surname" rules="required" v-model="form.surname">
                <UiLabel for="surname"> Familiya </UiLabel>
                <UiInput v-model="form.surname" id="surname" type="text" placeholder="Familiya" :error="!!errors.surname" />
              </VField>
            </div>
            <div class="flex flex-col gap-2">
              <VField name="father_name" rules="required" v-model="form.father_name">
                <UiLabel for="father_name"> Otasining ismi </UiLabel>
                <UiInput v-model="form.father_name" id="father_name" type="text" placeholder="Otasining ismi" :error="!!errors.father_name" />
              </VField>
            </div>
            <div class="flex flex-col gap-2">
              <VField name="phone_number" rules="required|min:9|max:9" v-model="form.phone_number">
                <UiLabel for="phone_number"> Telefon raqam </UiLabel>
                <div class="relative w-full items-center">
                  <UiInput v-model="form.phone_number" id="phone_number" type="text" v-maska="'#########'" placeholder="999999999" class="pl-12 focus:pl-12" :error="!!errors.phone_number" />
                  <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2 text-sm"> +998 </span>
                </div>
              </VField>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 flex justify-end gap-2 sm:mt-3">
        <UiButton type="submit" class="" :loading="loading"> Saqlash </UiButton>
      </div>
    </VForm>
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

  const { updateProfile, updateProfileByRole, getProfile, getProfileByRole } = profileStore;
  const { user, otherUser, loading } = storeToRefs(profileStore);

  const form = reactive({
    region: props.isAdmin ? otherUser.value?.region || "" : user.value?.region || "",
    district: props.isAdmin ? otherUser.value?.district || "" : user.value?.district || "",
    school: props.isAdmin ? otherUser.value?.school || "" : user.value?.school || "",
    class: props.isAdmin ? otherUser.value?.class || "" : user.value?.class || "",
    login: props.isAdmin ? otherUser.value?.login || "" : user.value?.login || "",
    tariff: props.isAdmin ? otherUser.value?.tariff || "" : user.value?.tariff || "",
    name: props.isAdmin ? otherUser.value?.name || "" : user.value?.name || "",
    surname: props.isAdmin ? otherUser.value?.surname || "" : user.value?.surname || "",
    father_name: props.isAdmin ? otherUser.value?.father_name || "" : user.value?.father_name || "",
    phone_number: props.isAdmin ? otherUser.value?.phone_number || "" : user.value?.phone_number || "",
  });

  async function handleSubmitForm() {
    try {
      let res;
      if (userRole.value === "school" && props.isAdmin) {
        res = await updateProfileByRole(route.params.userRole, route.query.userId, {
          name: form.name,
          surname: form.surname,
          father_name: form.father_name,
          phone_number: "+998" + form.phone_number,
        });
      } else {
        res = await updateProfile(userRole.value, {
          name: form.name,
          surname: form.surname,
          father_name: form.father_name,
          phone_number: "+998" + form.phone_number,
        });
      }
      if (res?.status === "success") {
        if (!props.isAdmin) {
          await getProfile(userRole.value);
        }
        showToast("Profil muvaffaqiyatli yangilandi", "success");
      }
    } catch (error) {
      showToast(error || "Profilni yangilashda xatolik yuz berdi", "error");
    }
  }
</script>
