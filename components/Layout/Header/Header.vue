<template>
  <header id="header" class="sticky top-0 z-30 border-b bg-background/80 px-4 backdrop-blur">
    <div class="flex h-14 items-center justify-between">
      <div class="hidden items-center gap-2 max-lg:flex">
        <NuxtLink to="/" class="flex h-14 items-center justify-between py-2">
          <img src="/assets/svg/logo.svg" alt="logo" class="h-9" />
        </NuxtLink>
      </div>
      <div class="flex flex-1 items-center justify-end gap-1">
        <LayoutHeaderLanguageSwitcher />
        <LayoutHeaderProfile />
        <!-- <LayoutHeaderDarkModeToggle /> -->
        <UiButton @click="openSheet = true" variant="outline" size="icon-sm" class="hidden h-auto w-auto items-center gap-2 border-none p-0 max-lg:flex">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" fill-rule="evenodd" d="M3 16h18v2H3zm0-5h18v2H3zm0-5h18v2H3z" />
          </svg>
        </UiButton>
      </div>
    </div>
    <div class="lg:hidden">
      <UiSheet v-model:open="openSheet">
        <UiSheetContent class="sm:max-w-none md:w-[350px]" side="left">
          <template #content>
            <UiScrollArea class="relative h-screen overflow-hidden py-6">
              <NuxtLink to="/" class="">
                <img src="/assets/svg/logo.svg" alt="logo" class="h-9" />
              </NuxtLink>
              <nav class="mt-6 flex flex-col gap-2">
                <NuxtLink
                  v-for="(item, index) in filteredMenuItems"
                  :key="index"
                  :to="item.route"
                  class="transition-300 group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted [&.router-link-active>span]:text-primary [&.router-link-active]:bg-muted"
                >
                  <span :class="`${item.icon} text-xl !leading-5 group-hover:text-primary`"></span>
                  {{ item.label }}
                </NuxtLink>
                <UiCollapsible v-if="userRole === 'school'" v-model:open="openReport">
                  <div class="flex items-center justify-between space-x-4">
                    <UiCollapsibleTrigger asChild>
                      <div class="transition-300 group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted">
                        <span class="icon-file transition-300 text-xl !leading-5 group-hover:text-primary"></span>
                        Hisobotlar
                        <span class="ml-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            class="icon h-4 w-4 transition duration-300"
                            :class="{ 'rotate-180': openReport }"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19 9l-7 6l-7-6"></path>
                          </svg>
                        </span>
                      </div>
                    </UiCollapsibleTrigger>
                  </div>
                  <UiCollapsibleContent class="pl-10">
                    <NuxtLink to="/" class="transition-300 group flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"> O'quvchilarga </NuxtLink>
                    <NuxtLink to="/" class="transition-300 group flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"> O'qituvchilarga </NuxtLink>
                    <NuxtLink to="/" class="transition-300 group flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"> Abiturientlarga </NuxtLink>
                  </UiCollapsibleContent>
                </UiCollapsible>
                <!-- <UiCollapsible v-if="userRole === 'school'" v-model:open="openTest">
                  <div class="flex items-center justify-between space-x-4">
                    <UiCollapsibleTrigger asChild>
                      <div class="transition-300 group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted">
                        <span class="icon-calculator transition-300 text-xl !leading-5 group-hover:text-primary"></span>
                        Test ochish
                        <span class="ml-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            class="icon h-4 w-4 transition duration-300"
                            :class="{ 'rotate-180': openTest }"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19 9l-7 6l-7-6"></path>
                          </svg>
                        </span>
                      </div>
                    </UiCollapsibleTrigger>
                  </div>
                  <UiCollapsibleContent class="pl-10">
                    <NuxtLink to="/reports/school/pupils" class="transition-300 group flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"> O'quvchilarga </NuxtLink>
                    <NuxtLink to="/reports/school/teachers" class="transition-300 group flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"> Abiturientlarga </NuxtLink>
                  </UiCollapsibleContent>
                </UiCollapsible> -->
              </nav>
            </UiScrollArea>
          </template>
        </UiSheetContent>
      </UiSheet>
    </div>
  </header>
</template>

<script setup>
  const userRole = useCookie("role");

  const router = useRouter();

  const openReport = ref(false);
  const openTest = ref(false);

  const openSheet = ref(false);

  const links = [
    {
      route: "/",
      label: "Asosiy sahifa",
      icon: "icon-home",
      roles: ["pupil", "teacher", "school"],
    },
    {
      route: "/open-tests",
      label: "Test ishlash",
      icon: "icon-document",
      roles: ["pupil", "teacher"],
    },
    {
      route: "/test-attempt-results",
      label: "Natijalar",
      icon: "icon-chart",
      roles: ["pupil", "teacher"],
    },
    {
      route: "/reports",
      label: "Hisobotlar",
      icon: "icon-file",
      roles: ["pupil", "teacher"],
    },
    {
      route: "/management",
      label: "Boshqaruv paneli",
      icon: "icon-briefcase",
      roles: ["school"],
    },
  ];
  const filteredMenuItems = computed(() => links.filter((item) => item.roles?.includes(userRole.value)));

  watch(
    () => router.currentRoute.value,
    () => {
      openSheet.value = false;
    }
  );
</script>
