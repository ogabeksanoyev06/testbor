<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger class="flex gap-1">
      <UiButton variant="ghost" size="icon-sm">
        <span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5">
            <path
              d="M14.9405 8.03998C15.1605 8.47998 15.2905 8.97998 15.2905 9.50998C15.2805 11.28 13.8905 12.73 12.1305 12.78C12.0605 12.77 11.9705 12.77 11.8905 12.78C10.1305 12.72 8.73047 11.28 8.73047 9.50998C8.73047 7.69998 10.1905 6.22998 12.0105 6.22998"
              stroke="CurrentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z"
              stroke="CurrentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 6C2.75 7.67 2 9.75 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C10.57 2 9.2 2.3 7.97 2.85"
              stroke="CurrentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <!-- <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80" class="h-8 w-8 rounded-full object-cover flex-shrink-0" alt=""> -->
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end" dir="ltr">
      <div class="text-sm">
        <div class="relative mb-2 flex flex-col items-center justify-center gap-y-3 rounded-lg bg-muted px-4 py-5 text-center">
          <div class="flex flex-col items-center justify-center gap-1">
            <span class="text-sm font-medium">{{ fullUserDetails }}</span>
            <span class="text-xs text-muted-foreground"> {{ getRoleName(userRole) }} </span>
          </div>
        </div>
      </div>
      <UiDropdownMenuGroup>
        <UiDropdownMenuItem>
          <NuxtLink :to="localePath('/profile')" class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="iconify iconify--ph h-4 w-4"
              font-size="16"
              width="1em"
              height="1em"
              viewBox="0 0 256 256"
            >
              <g fill="currentColor">
                <path d="M192 96a64 64 0 1 1-64-64a64 64 0 0 1 64 64" opacity=".2"></path>
                <path
                  d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8M72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56"
                ></path>
              </g>
            </svg>
            <span>Mening ma'lumotlarim</span>
          </NuxtLink>
        </UiDropdownMenuItem>
        <UiDropdownMenuItem @click="logout" class="cursor-pointer hover:!bg-destructive/5 hover:!text-destructive">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--lets-icons"
            font-size="16"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <defs>
              <mask id="iconifyReact17">
                <g fill="none">
                  <circle cx="6" cy="6" r="6" fill="#fff" fill-opacity=".25" transform="matrix(0 -1 -1 0 20 18)"></circle>
                  <path stroke="silver" stroke-opacity=".25" stroke-width=".6" d="M7.7 12a6.3 6.3 0 1 1 12.6 0a6.3 6.3 0 0 1-12.6 0Z"></path>
                  <path stroke="#fff" stroke-width="1.2" d="M8 18.928A8 8 0 1 0 8 5.072"></path>
                  <path fill="#fff" d="m2 12l-.469-.375l-.3.375l.3.375zm9 .6a.6.6 0 1 0 0-1.2zM5.531 6.625l-4 5l.938.75l4-5zm-4 5.75l4 5l.938-.75l-4-5zM2 12.6h9v-1.2H2z"></path>
                </g>
              </mask>
            </defs>
            <path fill="currentColor" d="M0 0h24v24H0z" mask="url(#iconifyReact17)"></path>
          </svg>
          <span>Tizimdan chiqish</span>
        </UiDropdownMenuItem>
      </UiDropdownMenuGroup>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>

<script setup>
  import { useAuthStore } from "@/stores/auth.js";
  import { useProfileStore } from "@/stores/profile.js";

  const localePath = useLocalePath();

  const profileStore = useProfileStore();
  const authStore = useAuthStore();

  const { userFullName, userInitials, fullUserDetails, user } = storeToRefs(profileStore);
  const { logout } = authStore;

  const userRole = useCookie("role");
</script>
