<template>
  <div class="grid gap-6">
    <section class="bg-white p-4 sm:rounded-xl">
      <div class="flex items-center justify-between">
        <h1 class="text-lg font-semibold md:text-2xl">O'qituvchilar ro'yxati</h1>
        <ModalTeacherAdd @add-teacher="handleAddTeacher" />
      </div>
    </section>
    <section class="overflow-x-auto">
      <UiTable>
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
          <UiTableRow v-for="(item, i) in teachers?.data" :key="i" class="odd:bg-muted/50">
            <UiTableCell class="font-medium">{{ i + 1 }} </UiTableCell>
            <UiTableCell> {{ getSchoolFullName(item.school) }} </UiTableCell>
            <UiTableCell> {{ getTeacherFullName(item) }} </UiTableCell>
            <UiTableCell class="text-blue-900">
              <a :href="'tel:' + (item?.phone_number || '')">
                {{ formatPhone(item?.phone_number) || "Telefon raqam mavjud emas" }}
              </a>
            </UiTableCell>
            <UiTableCell>{{ $dayjs(item.createdAt).format("DD.MM.YYYY HH:mm:ss") }} </UiTableCell>

            <UiTableCell class="">
              <NuxtLink :to="{ path: '/management/profile/teacher', query: { userId: item._id } }" class="text-primary">{{ item.login }} </NuxtLink>
            </UiTableCell>
            <UiTableCell class="" disabled>
              <NuxtLink  class="text-primary">Ko'rish </NuxtLink>
              <!-- :to="`/profile-manage/${item._id}`" -->
            </UiTableCell>
            <UiTableCell class="flex gap-2">
              <ModalTeacherEdit :teacherId="item._id" @edit-teacher="handleUpdateTeacher" />
              <ModalTeacherDelete :teacherId="item._id" @delete-teacher="handleDeleteTeacher" />
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </section>
  </div>
</template>

<script setup>
  import { useTeacherStore } from "@/stores/teacher.js";

  const teacherStore = useTeacherStore();

  const { getTeachers } = teacherStore;

  const handleAddTeacher = async () => {
    await refresh();
  };

  const handleDeleteTeacher = async () => {
    await refresh();
  };

  const handleUpdateTeacher = async () => {
    await refresh();
  };

  const getSchoolFullName = (school) => {
    if (school) {
      return `${school.number} - ${school.type}`;
    }
    return "";
  };

  const getTeacherFullName = (teacher) => {
    if (teacher) {
      return `${teacher.surname} ${teacher.name} ${teacher.father_name}`;
    }
    return "";
  };

  const { data: teachers, refresh } = await useAsyncData("teachers", async () => {
    return await getTeachers();
  });
</script>
