<template>
  <div class="">
    <UiTab :model-value="tab" :list="tabList" @update:model-value="changeTab" />
    <Transition name="fade" mode="out-in">
      <SectionProfileChangePassword v-if="tab === 1" />
      <SectionProfile v-else :isAdmin="false" />
    </Transition>
  </div>
</template>

<script setup>
  const tabList = [
    {
      name: "Asosiy ma'lumotlar",
      id: 0,
    },
    {
      name: "Parolni o'zgartirish",
      id: 1,
    },
  ];

  const tab = ref(tabList[0].id);
  const changeTab = (id) => {
    tab.value = id;
  };
</script>
