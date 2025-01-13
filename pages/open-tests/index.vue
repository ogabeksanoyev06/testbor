<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <div v-for="(type, i) in types?.data" class="transition-300 group relative flex h-full flex-col overflow-hidden rounded-lg bg-card p-2 shadow-md hover:shadow-sm">
      <div class="aspect-[252/200] h-[200px] shrink-0">
        <UiImage src="https://keenthemes.com/static/metronic/tailwind/dist/assets/media/images/600x400/1.jpg" class="h-full w-full rounded-lg object-cover object-top" />
      </div>
      <div class="flex h-full flex-col gap-3 rounded-xl p-2 sm:p-4">
        <p class="transition-300 text-xl font-semibold">
          {{ type.title_uz }}
        </p>
        <div class="mt-auto grid gap-4">
          <div class="flex flex-wrap gap-3">
            <UiBadge variant="outline" class="mb-2 border-ring/50 px-3 py-1 text-sm font-medium text-primary"> {{ type.duration }} <span class="ml-1">min</span> </UiBadge>
            <UiBadge variant="outline" class="mb-2 border-ring/50 px-3 py-1 text-sm font-medium text-primary"> {{ type.questions_count }} <span class="ml-1">savollar</span> </UiBadge>
          </div>
          <UiButton @click="navigateToTest(type._id, type.test_type)" class="w-full"> Test ishlash </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useTestStore } from "@/stores/test.js";

  const router = useRouter();
  const userRole = useCookie("role");

  const testStore = useTestStore();

  const { getTestTypes } = testStore;

  const navigateToTest = (test_id, test_type) => {
    let path = "";
    switch (test_type) {
      case "teacher_intern":
        path = `/open-tests/stajor-attestation/${test_type}/${test_id}`;
        break;
      case "attestation":
        path = `/open-tests/attestation/${test_type}/${test_id}`;
        break;
      case "national_certificate":
        path = `/open-tests/national-certificate/${test_type}/${test_id}`;
        break;
      case "school":
        path = `/open-tests/school/${test_type}/${test_id}`;
        break;
      case "dtm":
        path = `/open-tests/dtm/${test_type}/${test_id}`;
        break;
    }
    router.push(path);
  };

  const { data: types } = await useAsyncData("testTypes", async () => {
    return await getTestTypes(userRole.value);
  });
</script>
