<template>
  <div class="grid gap-6">
    <section class="">
      <div class="flex items-center justify-between">
        <h1 class="text-lg font-semibold md:text-2xl">Sinflar ro'yxati</h1>
        <ModalClassAdd @add-class="handleAddClass" />
      </div>
    </section>

    <section class="overflow-x-auto rounded-xl border">
      <UiTable class="font-medium">
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead> № </UiTableHead>
            <UiTableHead> Sinf </UiTableHead>
            <UiTableHead> O'quvchi soni </UiTableHead>
            <UiTableHead> Yaratilgan </UiTableHead>
            <UiTableHead> Tarif muddati </UiTableHead>
            <UiTableHead> Amaliyot </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="(item, i) in sortedClasses" :key="i" class="whitespace-nowrap odd:bg-muted">
            <UiTableCell class="font-medium">{{ i + 1 }} </UiTableCell>
            <UiTableCell>
              <NuxtLink :to="`/management/school/classes/${item._id}`" class="cursor-pointer text-primary"> {{ item.number }}{{ item.letter }} </NuxtLink>
            </UiTableCell>
            <UiTableCell class=""> {{ item.pupils }} </UiTableCell>
            <UiTableCell>{{ $dayjs(item.school?.createdAt).format("DD.MM.YYYY HH:mm:ss") }} </UiTableCell>
            <UiTableCell>
              <span class="rounded-lg bg-primary px-2 py-[2px] font-normal text-white">{{ $dayjs(item.tarif).format("DD.MM.YYYY | HH:mm:ss") }}</span>
            </UiTableCell>
            <UiTableCell class="flex gap-2">
              <ModalClassEdit :classId="item._id" @edit-class="handleUpdateClass" />
              <ModalClassDelete :classId="item._id" @delete-class="handleDeleteClass" />
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </section>
  </div>
</template>

<script setup>
  import { useClassStore } from "@/stores/class.js";

  const classStore = useClassStore();

  const { getClasses } = classStore;

  const handleAddClass = async () => {
    await refresh();
  };

  const handleDeleteClass = async () => {
    await refresh();
  };

  const handleUpdateClass = async () => {
    await refresh();
  };

  const sortedClasses = computed(() => {
    if (!classes.value?.data) return [];
    return classes.value.data.slice().sort((a, b) => {
      const numberA = Number(a.number) || 0;
      const numberB = Number(b.number) || 0;
      return numberA - numberB;
    });
  });

  const { data: classes, refresh } = await useAsyncData("classes", async () => {
    return await getClasses();
  });
</script>
