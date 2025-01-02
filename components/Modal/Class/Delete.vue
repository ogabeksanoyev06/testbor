<script setup>
  import { useCustomToast } from "@/composables/useCustomToast.js";
  import { useClassStore } from "@/stores/class.js";
  import { ref } from "vue";

  const emit = defineEmits(["delete-class"]);

  const props = defineProps({
    classId: [String, Number],
  });

  const { showToast } = useCustomToast();

  const classStore = useClassStore();

  const { deleteClass } = classStore;

  const isOpen = ref(false);
  const loading = ref(false);

  const confirmDelete = async () => {
    try {
      loading.value = true;
      const response = await deleteClass(props.classId);
      if (response.status === "success") {
        emit("delete-class");
        isOpen.value = false;
        showToast("Sinf muvaffaqiyatli o'chirildi!", "success");
      }
    } catch (error) {
      console.log(error);
      showToast("Sinf o'chirishda xato yuz berdi!", "error");
    } finally {
      loading.value = false;
    }
  };
</script>

<template>
  <div>
    <UiDialog v-model:open="isOpen">
      <UiDialogTrigger class="cursor-pointer">
        <svg class="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
            stroke="hsl(var(--destructive))"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
            stroke="hsl(var(--destructive))"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001"
            stroke="hsl(var(--destructive))"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M10.33 16.5H13.66" stroke="hsl(var(--destructive))" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M9.5 12.5H14.5" stroke="hsl(var(--destructive))" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </UiDialogTrigger>
      <UiDialogContent class="p-4 sm:max-w-[600px]">
        <div class="flex flex-col items-center p-5 pt-6">
          <h2 class="text-dark leading-130 mb-2 mt-4 text-xl font-semibold">Malumotni o'chirmoqchimisz?</h2>
          <p class="leading-130 text-sm text-gray-700">Siz sinfni o'chirmoqchimisiz?</p>
          <div class="mt-5 flex w-full gap-2">
            <UiButton variant="destructive" size="lg" class="w-full" :loading="loading" @click="confirmDelete"> O'chirish </UiButton>
            <UiDialogClose asChild>
              <UiButton size="lg" class="w-full"> Bekor qilish </UiButton>
            </UiDialogClose>
          </div>
        </div>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
