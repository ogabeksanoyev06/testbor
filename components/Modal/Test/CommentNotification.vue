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
            <RadioGroup v-model="value" class="flex flex-col gap-4">
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="r1" value="default" />
                <Label for="r1">Savol tushunarsiz yoki noto'g'ri</Label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="r2" value="comfortable" />
                <Label for="r2">Qiyinlik darajasi aniq emas</Label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="other" value="other" />
                <Label for="other">Boshqa</Label>
              </div>
            </RadioGroup>
            <div class="grid gap-2">
              <VField name="name" rules="required">
                <Label for="name" class="text-sm">Matnli izoh</Label>
                <Textarea id="name" type="text" placeholder="Matnli izoh" class="min-h-[180px]" />
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
