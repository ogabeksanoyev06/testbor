<script setup>
  import { useCustomToast } from "@/composables/useCustomToast.js";
  import { useClassStore } from "@/stores/class.js";
  import { reactive, ref } from "vue";

  const emit = defineEmits(["edit-class"]);

  const props = defineProps({
    classId: [String, Number],
  });

  const { showToast } = useCustomToast();
  const classStore = useClassStore();
  const { updateClass, getClassById } = classStore;

  const form = reactive({
    number: null,
    letter: "",
  });

  const loading = ref(false);
  const loadingClassId = ref(false);

  const isOpen = ref(false);

  const resetForm = () => {
    form.number = null;
    form.letter = "";
  };

  const classById = async () => {
    try {
      loadingClassId.value = true;
      const res = await getClassById(props.classId);
      if (res.status === "success") {
        form.number = String(res?.data?.number);
        form.letter = String(res?.data?.letter);
      }
    } catch (error) {
      console.log(error);
    } finally {
      loadingClassId.value = false;
    }
  };

  const handleSubmitForm = async () => {
    try {
      loading.value = true;
      const response = await updateClass(props.classId, form);
      if (response.status === "success") {
        emit("edit-class");
        resetForm();
        isOpen.value = false;
        showToast("Sinf muvaffaqiyatli o'zgartirildi!", "success");
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
      <UiDialogTrigger @click="classById" class="cursor-pointer">
        <svg class="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="hsl(var(--primary))" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M16.0399 3.02001L8.15988 10.9C7.85988 11.2 7.55988 11.79 7.49988 12.22L7.06988 15.23C6.90988 16.32 7.67988 17.08 8.76988 16.93L11.7799 16.5C12.1999 16.44 12.7899 16.14 13.0999 15.84L20.9799 7.96001C22.3399 6.60001 22.9799 5.02001 20.9799 3.02001C18.9799 1.02001 17.3999 1.66001 16.0399 3.02001Z"
            stroke="hsl(var(--primary))"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.9102 4.1499C15.5802 6.5399 17.4502 8.4099 19.8502 9.0899"
            stroke="hsl(var(--primary))"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </UiDialogTrigger>
      <UiDialogContent class="p-6">
        <UiDialogHeader>
          <UiDialogTitle> Sinfni tahrirlash</UiDialogTitle>
        </UiDialogHeader>
        <Transition name="fade" mode="out-in">
          <template v-if="loadingClassId">
            <div class="grid gap-4">
              <div class="grid gap-2" v-for="n in 2" :key="n">
                <UiSkeleton class="h-3 w-40" />
                <UiSkeleton class="h-10 w-full" />
              </div>
            </div>
          </template>
          <template v-else>
            <VForm @submit="handleSubmitForm" v-slot="{ errors }">
              <div class="mt-4 grid gap-4">
                <div class="grid gap-2">
                  <VField name="number" rules="required" v-model="form.number">
                    <UiLabel>Sinf raqamini tanlang</UiLabel>
                    <UiSelect v-model="form.number">
                      <UiSelectTrigger class="w-full" :error="!!errors.number">
                        <UiSelectValue placeholder="Sinfni tanlang" />
                      </UiSelectTrigger>
                      <UiSelectContent>
                        <UiSelectGroup>
                          <UiSelectItem v-for="item in classesData" :key="item.id" :value="String(item.number)">
                            {{ item.number }}
                          </UiSelectItem>
                        </UiSelectGroup>
                      </UiSelectContent>
                    </UiSelect>
                  </VField>
                </div>
                <div class="grid gap-2">
                  <VField name="letter" rules="required" v-model="form.letter">
                    <UiLabel>Sinf harfini tanlang</UiLabel>
                    <UiSelect v-model="form.letter">
                      <UiSelectTrigger class="w-full" :error="!!errors.letter">
                        <UiSelectValue placeholder="Sinf harfini tanlang" />
                      </UiSelectTrigger>
                      <UiSelectContent>
                        <UiSelectGroup>
                          <UiSelectItem v-for="item in lettersData" :key="item.id" :value="String(item.id)">
                            {{ item.name }}
                          </UiSelectItem>
                        </UiSelectGroup>
                      </UiSelectContent>
                    </UiSelect>
                  </VField>
                </div>
              </div>
              <div class="mt-4 flex justify-end">
                <UiButton :loading="loading" type="submit"> Saqlash </UiButton>
              </div>
            </VForm>
          </template>
        </Transition>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
