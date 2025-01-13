<template>
  <div>
    <UiDialog>
      <UiDialogTrigger as-child>
        <slot />
      </UiDialogTrigger>
      <UiDialogContent class="sm:max-w-[600px]">
        <UiDialogHeader>
          <UiDialogTitle>Izoh bildirish</UiDialogTitle>
          <UiDialogDescription> Murojatingiz albatta ko'rib chiqiladi </UiDialogDescription>
        </UiDialogHeader>
        <VForm @submit="handleSubmitForm" v-slot="{ errors }">
          <div class="flex flex-col gap-6 py-4">
            <UiRadioGroup v-model="value" class="flex flex-col gap-4">
              <div class="flex items-center space-x-2">
                <UiRadioGroupItem id="r1" value="default" />
                <UiLabel for="r1">Savol tushunarsiz yoki noto'g'ri</UiLabel>
              </div>
              <div class="flex items-center space-x-2">
                <UiRadioGroupItem id="r2" value="comfortable" />
                <UiLabel for="r2">Qiyinlik darajasi aniq emas</UiLabel>
              </div>
              <div class="flex items-center space-x-2">
                <UiRadioGroupItem id="other" value="other" />
                <UiLabel for="other">Boshqa</UiLabel>
              </div>
            </UiRadioGroup>
            <div class="grid gap-2">
              <VField name="name" rules="required">
                <UiLabel for="name" class="text-sm">Matnli izoh</UiLabel>
                <UiTextarea id="name" type="text" placeholder="Matnli izoh" class="min-h-[180px]" />
              </VField>
            </div>
            <UiDialogFooter class="!gap-4">
              <UiDialogClose>
                <UiButton variant="outline"> Bekor qilish </UiButton>
              </UiDialogClose>
              <UiButton type="submit" disabled> Topshirish </UiButton>
            </UiDialogFooter>
          </div>
        </VForm>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script setup>
  const value = ref("");
</script>
