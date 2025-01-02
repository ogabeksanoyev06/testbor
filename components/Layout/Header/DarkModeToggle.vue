<script setup>
  const colorMode = useColorMode();

  const list = [
    {
      label: "Yorug'lik",
      value: "light",
      icon: "i-lucide:sun",
    },
    {
      label: "Qorong'ulik",
      value: "dark",
      icon: "i-lucide:moon",
    },
    {
      label: "Tizimga mos",
      value: "system",
      icon: "i-lucide:laptop",
    },
  ];
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="ghost" size="icon-sm" class="max-sm:hidden">
        <Icon name="i-lucide:sun" class="h-[18px] w-[18px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icon v-if="colorMode.preference === 'dark'" name="i-lucide:moon" class="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <Icon v-if="colorMode.preference === 'system'" name="i-lucide:laptop" class="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end">
      <UiDropdownMenuItem
        v-for="(item, key) in list"
        :key
        :title="item.label"
        :icon="item.icon"
        class="cursor-pointer"
        :class="{ 'bg-muted': item.value === colorMode.preference }"
        @click="colorMode.preference = item.value"
      />
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
