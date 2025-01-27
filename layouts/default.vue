<template>
  <div class="grid grid-cols-1 px-0 lg:grid-cols-[280px_minmax(0,1fr)]">
    <!-- container -->
    <LayoutSidebar />
    <main class="mx-auto w-full pb-5">
      <LayoutHeader />
      <div class="container p-3">
        <slot />
      </div>
      <LayoutFooter />
    </main>
  </div>
</template>

<script setup>
  import { useProfileStore } from "@/stores/profile.js";
  import { useRoute } from "vue-router";

  const profileStore = useProfileStore();

  const { getProfile } = profileStore;

  const route = useRoute();
  const localePath = useLocalePath();
  const userRole = useCookie("role");

  const { data } = await useAsyncData("profile", async () => {
    return await getProfile(userRole.value);
  });
</script>
