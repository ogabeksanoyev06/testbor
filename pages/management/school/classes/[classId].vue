<template>
  <div class="grid gap-6">
    <section class="">
      <div class="flex items-center justify-between gap-3 max-sm:flex-col">
        <h1 class="text-lg font-semibold md:text-2xl">O'quvchilar ro'yxati</h1>
        <ModalPupilAdd @add-pupil="handleAddPupil" />
      </div>
    </section>

    <section class="overflow-x-auto">
      <UiTable>
        <UiTableCaption v-if="pupils.data.length === 0">
          <p class="mt-4">Hech narsa topilmadi</p>
        </UiTableCaption>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead> № </UiTableHead>
            <UiTableHead> Maktab </UiTableHead>
            <UiTableHead> F.I.O </UiTableHead>
            <UiTableHead> Telefon raqam </UiTableHead>
            <UiTableHead> Yaratilgan </UiTableHead>
            <UiTableHead> Profil </UiTableHead>
            <UiTableHead> Natijalari </UiTableHead>
            <UiTableHead> Amaliyot </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody class="font-medium">
          <UiTableRow v-for="(item, i) in pupils.data" :key="i" class="odd:bg-muted">
            <UiTableCell class="font-medium">{{ i + 1 }} </UiTableCell>
            <UiTableCell> {{ getSchoolFullName(item.school) }}</UiTableCell>
            <UiTableCell> {{ getPupilFullName(item) }} </UiTableCell>
            <UiTableCell class="text-blue-900">
              <a :href="'tel:' + (item?.phone_number || '')">
                {{ formatPhone(item?.phone_number) || "Telefon raqam mavjud emas" }}
              </a>
            </UiTableCell>
            <UiTableCell>{{ $dayjs(item.createdAt).format("DD.MM.YYYY HH:mm:ss") }} </UiTableCell>
            <UiTableCell>
              <NuxtLink
                :to="{
                  path: localePath('/management/profile/pupil'),
                  query: { userId: item._id },
                }"
                class="text-primary"
                >{{ item.login }}
              </NuxtLink>
            </UiTableCell>
            <UiTableCell class="">
              <NuxtLink
                :to="{
                  path: '/management/test-attempt-results/pupil',
                  query: { userId: item._id },
                }"
                class="text-primary"
                >Ko'rish
              </NuxtLink>
            </UiTableCell>
            <UiTableCell class="flex items-center gap-2">
              <ModalPupilEdit :pupilId="item._id" @edit-pupil="handleUpdatePupil" />
              <ModalPupilDelete :pupilId="item._id" @delete-pupil="handleDeletePupil" />
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </section>
  </div>
</template>

<script setup>
  import { usePupilStore } from "@/stores/pupil.js";
  import { useRoute } from "vue-router";

  const localePath = useLocalePath();

  const route = useRoute();
  const pupilStore = usePupilStore();
  const { getPupilsClassById } = pupilStore;

  const handleAddPupil = async () => {
    await refresh();
  };

  const handleDeletePupil = async () => {
    await refresh();
  };

  const handleUpdatePupil = async () => {
    await refresh();
  };

  const getSchoolFullName = (school) => {
    if (school) {
      return `${school.number} ${school.type}`;
    }
    return "";
  };

  const getPupilFullName = (pupil) => {
    if (pupil) {
      return `${pupil.surname} ${pupil.name} ${pupil.father_name}`;
    }
    return "";
  };

  const { data: pupils, refresh } = await useAsyncData("pupils", async () => {
    return await getPupilsClassById(route.params.classId);
  });
</script>
