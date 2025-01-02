<template>
  <div class="">
    <h3 class="leading-130 mb-6 text-base font-semibold md:text-xl lg:mb-8 lg:text-2xl">Hisobot turini tanlang</h3>
    <div class="invisible-scroll overflow-x-auto rounded-xl border">
      <UiTable class="w-full">
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead> № </UiTableHead>
            <UiTableHead> Test turi </UiTableHead>
            <UiTableHead> Savollar soni</UiTableHead>
            <UiTableHead> Test davomiyligi </UiTableHead>
            <UiTableHead> Status </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="(item, i) in data?.data" :key="i" class="odd:bg-muted">
            <UiTableCell class="font-medium">{{ i + 1 }} </UiTableCell>
            <UiTableCell class="font-medium">
              <NuxtLink :to="localePath(`/reports/${item._id}`)" class="text-primary">{{ item?.title_uz }}</NuxtLink>
            </UiTableCell>
            <UiTableCell> {{ item.questions_count }} </UiTableCell>
            <UiTableCell>{{ item.duration }} </UiTableCell>
            <UiTableCell> {{ item.status ? "Faol" : "Faol emas" }} </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
  </div>
</template>

<script setup>
  import { useTestStore } from "@/stores/test.js";

  const userRole = useCookie("role");

  const localePath = useLocalePath();

  const testStore = useTestStore();

  const { getTestTypes } = testStore;

  const { data } = await useAsyncData("testTypes", async () => {
    return await getTestTypes(userRole.value);
  });
</script>
