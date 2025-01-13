<template>
  <div class="">
    <h3 class="leading-130 mb-6 text-base font-semibold md:text-xl lg:mb-8 lg:text-2xl">Ishlangan testlarni mavzular kesimida hisoboti</h3>
    <div class="invisible-scroll overflow-x-auto rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead> № </UiTableHead>
            <UiTableHead> Mavzu </UiTableHead>
            <UiTableHead> Soni</UiTableHead>
            <UiTableHead> To'g'rilar </UiTableHead>
            <UiTableHead> Xatolar </UiTableHead>
            <UiTableHead> Foiz </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="(item, i) in data?.data" :key="i" class="odd:bg-muted">
            <UiTableCell class="font-medium">{{ i + 1 }} </UiTableCell>
            <UiTableCell class="font-medium"> {{ item.theme?.name_uz?.slice(0, item.theme?.name_uz.indexOf('.')) }} </UiTableCell>
            <UiTableCell> {{ item.total_questions }} </UiTableCell>
            <UiTableCell>{{ item.total_correct }} </UiTableCell>
            <UiTableCell> {{ item.total_incorrect }} </UiTableCell>
            <UiTableCell>{{ item.percentage_correct }} % </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
  </div>
</template>

<script setup>
  import { useTestStore } from "@/stores/test.js";

  const userRole = useCookie("role");
  const route = useRoute();
  const localePath = useLocalePath();

  const testStore = useTestStore();

  const { getSubjectsReportResults } = testStore;

  const { data } = await useAsyncData("SubjectsReportResults", async () => {
    return await getSubjectsReportResults(userRole.value, route.params.scienceId, route.params.subjectId);
  });
</script>
