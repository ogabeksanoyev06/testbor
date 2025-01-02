<script setup>
import { reactive, ref } from 'vue'
import { useTeacherStore } from '@/stores/teacher.js'
import { useCustomToast } from '@/composables/useCustomToast.js'

const emit = defineEmits(['edit-teacher'])

const props = defineProps({
  teacherId: [Number, String],
})

const { showToast } = useCustomToast()
const teacherStore = useTeacherStore()
const { updateTeacher, getTeacherById } = teacherStore

const form = reactive({
  name: '',
  surname: '',
  father_name: '',
  phone_number: '',
})

const loading = ref(false)
const loadingId = ref(false)
const isOpen = ref(false)

const resetForm = () => {
  form.name = ''
  form.surname = ''
  form.father_name = ''
  form.phone_number = ''
  isOpen.value = false
}

const teacherById = async () => {
  try {
    loadingId.value = true
    const res = await getTeacherById(props.teacherId)
    if (res.status === 'success') {
      form.name = res.data?.name
      form.surname = res.data?.surname
      form.father_name = res.data?.father_name
      form.phone_number = res.data?.phone_number
    }
  } catch (error) {
    showToast(error.response.data.message, 'error')
  } finally {
    loadingId.value = false
  }
}

const handleSubmitForm = async () => {
  loading.value = true
  try {
    const response = await updateTeacher(props.teacherId, form)
    if (response.status === 'success') {
      emit('edit-teacher')
      resetForm()
      showToast("O'qituvchi muvaffaqiyatli o'zgartirildi!", 'success')
    }
  } catch (error) {
    showToast(error.response.data.message, 'error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <UiDialog v-model:open="isOpen">
      <UiDialogTrigger @click="teacherById" class="cursor-pointer">
        <svg class="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="hsl(var(--primary))" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M16.0399 3.02001L8.15988 10.9C7.85988 11.2 7.55988 11.79 7.49988 12.22L7.06988 15.23C6.90988 16.32 7.67988 17.08 8.76988 16.93L11.7799 16.5C12.1999 16.44 12.7899 16.14 13.0999 15.84L20.9799 7.96001C22.3399 6.60001 22.9799 5.02001 20.9799 3.02001C18.9799 1.02001 17.3999 1.66001 16.0399 3.02001Z"
            stroke="hsl(var(--primary))"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M14.9102 4.1499C15.5802 6.5399 17.4502 8.4099 19.8502 9.0899" stroke="hsl(var(--primary))" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </UiDialogTrigger>
      <UiDialogContent class="p-6">
        <UiDialogHeader>
          <UiDialogTitle>O'qituvchini tahrirlash</UiDialogTitle>
        </UiDialogHeader>
        <Transition name="fade" mode="out-in">
          <template v-if="loadingId">
            <div class="grid gap-4">
              <div class="grid gap-2" v-for="n in 4" :key="n">
                <UiSkeleton class="h-3 w-40" />
                <UiSkeleton class="h-10 w-full" />
              </div>
            </div>
          </template>
          <template v-else>
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
                  <VField name="phone" rules="required" v-model="form.phone_number">
                    <UiLabel for="phone">Telefon raqam</UiLabel>
                    <div class="relative">
                      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2"> +998 </span>
                      <UiInput v-model="form.phone_number" v-maska="'#########'" id="phone" type="text" placeholder="Telefon raqam" class="pl-12 focus:pl-12" :error="errors.phone" />
                    </div>
                  </VField>
                </div>
              </div>
              <div class="flex justify-end mt-4">
                <UiButton :loading="loading" type="submit"> Saqlash </UiButton>
              </div>
            </VForm>
          </template>
        </Transition>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
