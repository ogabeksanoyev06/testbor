<template>
  <div class="p-4 sm:rounded-xl">
    <h3 class="leading-130 mb-6 text-base font-semibold md:text-xl lg:mb-8 lg:text-2xl">Ishlangan testlarni fanlar kesimida hisoboti</h3>
    <div class="invisible-scroll overflow-x-auto rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead> № </UiTableHead>
            <UiTableHead> Fan </UiTableHead>
            <UiTableHead> Soni </UiTableHead>
            <UiTableHead> To'grilar </UiTableHead>
            <UiTableHead> Xatolar </UiTableHead>
            <UiTableHead> Foiz </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="(item, i) in filteredData" :key="i" class="odd:bg-muted">
            <UiTableCell class="font-medium">{{ i + 1 }} </UiTableCell>
            <UiTableCell class="font-medium">
              <NuxtLink class="text-primary" :to="localePath(`/reports/${route.params.testId}/${item.subject?._id}`)">
                {{ item.subject?.name_uz }}
              </NuxtLink>
            </UiTableCell>
            <UiTableCell> {{ item.total_questions }} </UiTableCell>
            <UiTableCell> {{ item.total_correct }} </UiTableCell>
            <UiTableCell> {{ item.total_incorrect }} </UiTableCell>
            <UiTableCell> {{ item.percentage_correct }} % </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
  </div>
</template>

<script setup>
  import { useProfileStore } from "@/stores/profile.js";
  import { useTestStore } from "@/stores/test.js";
  import { computed } from "vue";
  import { useRoute } from "vue-router";

  const userRole = useCookie("role");
  const route = useRoute();
  const localePath = useLocalePath();

  const testStore = useTestStore();
  const profileStore = useProfileStore();

  const { getScienceReportResults } = testStore;
  const { user } = storeToRefs(profileStore);

  const { data: subjects } = await useAsyncData("ScienceReportResults", async () => {
    return await getScienceReportResults(userRole.value, { testtype: route.params.testId });
  });

  const filteredData = computed(() => {
    const userClassNumber = Number(user?.value?.classNumber);
    return Number(route.params.testId) === 15 ? subjects.value?.data?.filter((row) => row?.subject?.class === userClassNumber) : subjects.value?.data;
  });
</script>
