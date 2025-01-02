<template>
  <div class="mx-auto mt-10 w-full rounded-lg bg-card p-4 shadow-md sm:max-w-[550px]">
    <VForm @submit="handleSubmitForm" v-slot="{ errors }">
      <div class="grid gap-4 sm:gap-6">
        <div class="grid gap-2">
          <VField name="science" rules="required" v-model="form.science">
            <UiLabel>Fan</UiLabel>
            <UiSelect v-model="form.science">
              <UiSelectTrigger placeholder="Fanni tanlang" />
              <UiSelectContent>
                <UiSelectLabel>Fanlardan birini tanlang</UiSelectLabel>
                <UiSelectSeparator />
                <UiSelectGroup>
                  <UiSelectItem v-for="item in subjects.data" :key="item.id" :value="item._id">
                    {{ item.name_uz }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </VField>
        </div>
        <div class="grid gap-2">
          <VField name="lang" rules="required" v-model="form.lang">
            <UiLabel>Til</UiLabel>
            <UiSelect v-model="form.lang">
              <UiSelectTrigger placeholder="Test tilini tanlang" />
              <UiSelectContent>
                <UiSelectLabel>Tilladan birini tanlang</UiSelectLabel>
                <UiSelectSeparator />
                <UiSelectGroup>
                  <UiSelectItem v-for="item in languages" :key="item.id" :value="item.value" :disabled="!item.status">
                    {{ item.name }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </VField>
        </div>
      </div>
      <div class="mt-10 flex justify-center">
        <UiButton type="submit" class="w-full" :loading="loading"> Testni boshlash </UiButton>
      </div>
    </VForm>
  </div>
</template>

<script setup>
  import { useCustomToast } from "@/composables/useCustomToast.js";
  import { useTestStore } from "@/stores/test.js";
  import { useRoute, useRouter } from "vue-router";

  const route = useRoute();
  const router = useRouter();
  const userRole = useCookie("role");

  const { showToast } = useCustomToast();

  const testStore = useTestStore();

  const { getTestTypeSubject, startTest } = testStore;

  const loading = ref(false);

  const form = reactive({
    science: "",
    lang: "O`zbek",
  });

  const handleSubmitForm = async () => {
    try {
      loading.value = true;
      const response = await startTest(userRole.value, route.params.test_type, route.params.test_type_id, form.science);
      if (response.status === "success") {
        const redirectUrl = `/active-test/${route.params.test_type}/${response.data._id}`;
        router.push(redirectUrl);
        showToast("Test muvaffaqiyatli boshlandi!", "success");
      }
    } catch (error) {
      showToast(error.response.data.message, "info");
      console.log(error);
      const redirectUrl = `/active-test/${route.params.test_type}/${error.response?.data?.data.active_test_id}`;
      router.push(redirectUrl);
    } finally {
      loading.value = false;
    }
  };

  const { data: subjects } = await useAsyncData("subjects", async () => {
    return await getTestTypeSubject(userRole.value, route.params.test_type_id);
  });
</script>
