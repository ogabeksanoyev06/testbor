<template>
  <div>
    <h2 class="text-lg font-bold sm:text-xl">Mening urinishlarim</h2>
    <p class="mb-6 text-muted-foreground sm:mb-10">Urinishlar soni: {{ data?.data?.length }}</p>
    <div class="overflow-x-auto rounded-lg border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow class="font-medium">
            <UiTableHead> № </UiTableHead>
            <UiTableHead>Sana va vaqt</UiTableHead>
            <UiTableHead>Ball</UiTableHead>
            <UiTableHead> Test turi </UiTableHead>
            <UiTableHead> Status </UiTableHead>
            <UiTableHead> Amaliyot </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="(item, i) in data.data" :key="i" class="odd:bg-muted">
            <UiTableCell>
              {{ getRowNumber(i) }}
            </UiTableCell>
            <UiTableCell>{{ $dayjs(item.startedAt).format("DD.MM.YYYY HH:mm:ss") }} - {{ $dayjs(item.endedAt).format("DD.MM.YYYY HH:mm:ss") }}</UiTableCell>
            <UiTableCell> {{ item.correct_answers }} </UiTableCell>
            <UiTableCell>{{ item.test_type_id?.title_uz }}</UiTableCell>
            <UiTableCell>
              <span v-if="item.status === 'in-progress'" class="text-red-500"> Yakunlanmagan </span>
              <span v-else-if="item.status === 'completed' || 'timed-out'" class="text-green-500"> Yakunlangan </span>
            </UiTableCell>
            <UiTableCell v-if="item.status !== 'in-progress'">
              <NuxtLink :to="localePath(`/test-attempt-results/${item._id}`)" class="flex items-center gap-1 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                  />
                </svg>
                Ko'rish
              </NuxtLink>
            </UiTableCell>
            <UiTableCell v-if="item.status === 'in-progress'"> Jarayonda </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
    <div class="my-4 flex justify-end">
      <UiPagination :total="total" :page="page" @update:page="handlePageUpdate" :sibling-count="1" />
    </div>
  </div>
</template>

<script setup>
  import { useTestStore } from "@/stores/test.js";

  const localePath = useLocalePath();

  const testStore = useTestStore();

  const { getResults } = testStore;

  const userRole = useCookie("role");

  const page = ref(1);
  const total = ref(1);
  const limit = 10;

  const handlePageUpdate = (value) => {
    page.value = value;
  };

  const getRowNumber = (index) => {
    return (page.value - 1) * limit + index + 1;
  };

  const { data } = await useAsyncData(
    `results-attempt-${page.value}`,
    async () => {
      return await getResults(userRole.value, { page: page.value, limit: limit });
    },
    {
      watch: [page],
    }
  );

  total.value = data.value?._meta?.totalItems || 0;
</script>
