<script setup>
  import { useCustomToast } from "@/composables/useCustomToast.js";
  import { useTeacherStore } from "@/stores/teacher.js";
  import { reactive } from "vue";

  const emit = defineEmits(["add-teacher"]);
  const { showToast } = useCustomToast();

  const teacherStore = useTeacherStore();
  const { createTeacher } = teacherStore;

  const form = reactive({
    name: "",
    surname: "",
    father_name: "",
    phone_number: "",
  });

  const loading = ref(false);
  const isOpen = ref(false);

  const resetForm = () => {
    form.name = "";
    form.surname = "";
    form.father_name = "";
    form.phone_number = "";
    isOpen.value = false;
  };

  const handleSubmitForm = async () => {
    try {
      loading.value = true;
      const response = await createTeacher(form);
      if (response.status === "success") {
        emit("add-teacher");
        resetForm();
        showToast("O'qituvchi muvaffaqiyatli qo'shildi!", "success");
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    } finally {
      loading.value = false;
    }
  };
</script>

<template>
  <div>
    <UiDialog v-model:open="isOpen">
      <UiDialogTrigger as-child>
        <UiButton>
          O'qituvchi qo'shish
          <svg class="h-5 w-5" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 12.3252H15M12 9.3252V15.3252M3 12.3252C3 13.5071 3.23279 14.6774 3.68508 15.7693C4.13738 16.8613 4.80031 17.8534 5.63604 18.6892C6.47177 19.5249 7.46392 20.1878 8.55585 20.6401C9.64778 21.0924 10.8181 21.3252 12 21.3252C13.1819 21.3252 14.3522 21.0924 15.4442 20.6401C16.5361 20.1878 17.5282 19.5249 18.364 18.6892C19.1997 17.8534 19.8626 16.8613 20.3149 15.7693C20.7672 14.6774 21 13.5071 21 12.3252C21 11.1433 20.7672 9.97297 20.3149 8.88104C19.8626 7.78911 19.1997 6.79696 18.364 5.96123C17.5282 5.12551 16.5361 4.46257 15.4442 4.01028C14.3522 3.55799 13.1819 3.3252 12 3.3252C10.8181 3.3252 9.64778 3.55799 8.55585 4.01028C7.46392 4.46257 6.47177 5.12551 5.63604 5.96123C4.80031 6.79696 4.13738 7.78911 3.68508 8.88104C3.23279 9.97297 3 11.1433 3 12.3252Z"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </UiButton>
      </UiDialogTrigger>
      <UiDialogContent class="p-6">
        <UiDialogHeader>
          <UiDialogTitle> Yangi o'qituvchi qo'shish</UiDialogTitle>
        </UiDialogHeader>

        <VForm @submit="handleSubmitForm" v-slot="{ errors }">
          <div class="flex flex-col gap-4">
            <div class="grid gap-2">
              <VField name="name" rules="required" v-model="form.name">
                <UiLabel for="name">Ism</UiLabel>
                <UiInput v-model="form.name" id="name" type="text" placeholder="Ism" :error="errors.name" />
              </VField>
            </div>
            <div class="grid gap-2">
              <VField name="surname" rules="required" v-model="form.surname">
                <UiLabel for="surname">Familiya</UiLabel>
                <UiInput v-model="form.surname" id="surname" type="text" placeholder="Familiya" :error="errors.surname" />
              </VField>
            </div>
            <div class="grid gap-2">
              <VField name="father_name" rules="required" v-model="form.father_name">
                <UiLabel for="father_name">Otasining ismi</UiLabel>
                <UiInput v-model="form.father_name" id="father_name" type="text" placeholder="Otasining ismi" :error="errors.father_name" />
              </VField>
            </div>
            <div class="grid gap-2">
              <VField name="phone_number" rules="required" v-model="form.phone_number">
                <UiLabel for="phone_number">Telefon raqam</UiLabel>
                <div class="relative">
                  <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2"> +998 </span>
                  <UiInput v-model="form.phone_number" v-maska="'#########'" id="phone_number" type="text" placeholder="Telefon raqam" class="pl-12 focus:pl-12" :error="errors.phone_number" />
                </div>
              </VField>
            </div>
          </div>
          <div class="mt-4 flex justify-end">
            <UiButton :loading="loading" type="submit"> Saqlash </UiButton>
          </div>
        </VForm>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
