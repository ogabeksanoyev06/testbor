<template>
  <div></div>
</template>

<script setup>
  import { useSchoolStore } from "@/stores/school.js";

  const schoolStore = useSchoolStore();

  const { getTestTypes } = schoolStore;

  // const { data: testTypes } = await useAsyncData("testTypes", async () => {
  //   return await getTestTypes();
  // });
</script>
