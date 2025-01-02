<script setup>
import { ref } from 'vue'
import { usePupilStore } from '@/stores/pupil.js'
import { useCustomToast } from '@/composables/useCustomToast.js'

const emit = defineEmits(['delete-pupil'])

const props = defineProps({
  pupilId: [Number, String],
})

const { showToast } = useCustomToast()

const pupilStore = usePupilStore()

const { deletePupil } = pupilStore

const loading = ref(false)
const isOpen = ref(false)

const confirmDelete = async () => {
  try {
    loading.value = true
    const response = await deletePupil(props.pupilId)
    if (response.status === 'success') {
      emit('delete-pupil')
      isOpen.value = false
      showToast("Sinf muvaffaqiyatli o'chirildi!", 'success')
    }
  } catch (error) {
    console.log(error)
    showToast("Sinf o'chirishda xato yuz berdi!", 'error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <UiDialog v-model:open="isOpen">
      <UiDialogTrigger class="cursor-pointer">
        <svg class="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998" stroke="hsl(var(--destructive))" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="hsl(var(--destructive))" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001" stroke="hsl(var(--destructive))" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M10.33 16.5H13.66" stroke="hsl(var(--destructive))" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M9.5 12.5H14.5" stroke="hsl(var(--destructive))" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </UiDialogTrigger>
      <UiDialogContent class="sm:max-w-[600px] p-4">
        <div class="pt-6 p-5 flex flex-col items-center">
          <h2 class="mt-4 mb-2 text-xl text-dark font-semibold leading-130">Malumotni o'chirmoqchimisz?</h2>
          <p class="leading-130 text-gray-700 text-sm">Siz o'quvchini o'chirmoqchimisiz?</p>
          <div class="flex gap-2 w-full mt-5">
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
