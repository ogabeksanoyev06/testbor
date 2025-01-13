<template>
  <div></div>
</template>

<script setup>
  import { useProfileStore } from "@/stores/profile.js";
  import { useRoute } from "vue-router";

  const userRole = useCookie("role");

  const profileStore = useProfileStore();

  const { getProfileByRole } = profileStore;

  const route = useRoute();

  // const { data } = await useAsyncData("pupils-profile", async () => {
  //   return await getProfileByRole(route.params.userRole, route.query.userId);
  // });
</script>
