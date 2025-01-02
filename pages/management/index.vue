<template>
  <div class="">
    <h3 class="leading-130 mb-6 text-base font-semibold md:text-xl lg:mb-8 lg:text-2xl">Ro'yxatga olish</h3>
    <div class="grid max-w-screen-2xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      <NuxtLink :to="localePath('/management/school/classes')">
        <div
          class="transition-300 hover:shadow-box-soft flex h-full cursor-pointer items-center gap-2 rounded-xl border-b bg-background p-3 max-md:flex-col max-md:justify-center md:gap-3"
          tabindex="0"
        >
          <svg class="h-6 w-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 20a2 2 0 1 0-4 0a2 2 0 0 0 4 0M16 4a2 2 0 1 0-4 0a2 2 0 0 0 4 0m0 16a2 2 0 1 0-4 0a2 2 0 0 0 4 0m-5-8a2 2 0 1 0-4 0a2 2 0 0 0 4 0m10 0a2 2 0 1 0-4 0a2 2 0 0 0 4 0M5.058 18.306l2.88-4.606m2.123-3.397l2.877-4.604m-2.873 8.006l2.876 4.6M15.063 5.7l2.881 4.61"
            />
          </svg>
          <div class="flex flex-grow flex-col justify-between">
            <h3 class="!leading-130 my-auto w-full text-base font-semibold max-md:text-center md:line-clamp-1 md:text-lg">Sinflar ro'yxati</h3>
            <p class="text-gray leading-130 w-full text-[11px] max-md:text-center md:text-xs">{{ data.classes?.data?.length }} ta sinflar</p>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink :to="localePath('/management/school/teachers')">
        <div
          class="transition-300 hover:shadow-box-soft flex h-full cursor-pointer items-center gap-2 rounded-xl border-b bg-background p-3 max-md:flex-col max-md:justify-center md:gap-3"
          tabindex="0"
        >
          <svg class="h-6 w-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7"
            />
          </svg>
          <div class="flex flex-grow flex-col justify-between">
            <h3 class="!leading-130 my-auto w-full text-base font-semibold max-md:text-center md:line-clamp-1 md:text-lg">O'qituvchilar ro'yxati</h3>
            <p class="text-gray leading-130 w-full text-[11px] max-md:text-center md:text-xs">{{ data.teachers?.data?.length }} ta o'qituvchilar</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  import { useClassStore } from "@/stores/class.js";
  import { useTeacherStore } from "@/stores/teacher.js";

  const localePath = useLocalePath();

  const teacherStore = useTeacherStore();
  const classStore = useClassStore();

  const { getClasses } = classStore;
  const { getTeachers } = teacherStore;

  const { data } = await useAsyncData("classess", async () => {
    const [classesResult, teachersResult] = await Promise.all([getClasses(), getTeachers()]);
    return {
      classes: classesResult,
      teachers: teachersResult,
    };
  });
</script>
