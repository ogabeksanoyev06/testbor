<template>
  <div class="">
    <UiTab :model-value="tab" :list="tabList" @update:model-value="changeTab" class="" />
    <Transition name="fade" mode="out-in">
      <SectionProfileChangePassword v-if="tab === 1" :isAdmin="isAdmin" />
      <SectionProfile v-else :isAdmin="isAdmin" />
    </Transition>
  </div>
</template>

<script setup>
  import SectionProfile from "@/components/Section/Profile";
  import SectionProfileChangePassword from "@/components/Section/Profile/ChangePassword.vue";
  import { useProfileStore } from "@/stores/profile.js";
  import { computed, ref } from "vue";
  import { useRoute } from "vue-router";

  const userRole = useCookie("role");

  const profileStore = useProfileStore();

  const { getProfileByRole } = profileStore;

  const route = useRoute();

  const tabList = [
    {
      name: "Asosiy ma`lumotlar",
      id: 0,
    },
    {
      name: "Parolni o`zgartirish",
      id: 1,
    },
  ];

  const tab = ref(tabList[0].id);
  const isAdmin = true;

  const currentSection = computed(() => {
    return tab.value === 0 ? SectionProfile : SectionProfileChangePassword;
  });

  const changeTab = (id) => {
    tab.value = id;
  };

  const { data } = await useAsyncData("pupils-profile", async () => {
    return await getProfileByRole(route.params.userRole, route.query.userId);
  });
</script>
