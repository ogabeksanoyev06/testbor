<template>
  <div>
    <UiDialog v-model:open="isOpen">
      <UiDialogTrigger as-child>
        <slot />
      </UiDialogTrigger>
      <UiDialogContent class="sm:max-w-[900px]">
        <div class="mt-6 grid gap-4">
          <div class="flex items-center justify-between">
            <h3 class="flex-1 text-base font-semibold" v-katex:auto v-html="question?.question_text" />
            <ModalTestCommentNotification>
              <UiButton class="h-auto border-none p-0" variant="outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="tabler-icon tabler-icon-info-square-rounded"
                >
                  <path d="M12 9h.01"></path>
                  <path d="M11 12h1v4h1"></path>
                  <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
                </svg>
              </UiButton>
            </ModalTestCommentNotification>
          </div>
          <ul class="grid grid-cols-1 gap-3">
            <li
              v-for="(option, i) in question.options"
              v-katex:auto
              class="flex min-h-14 items-center justify-between gap-1 overflow-x-auto overflow-y-hidden rounded-xl border-2 border-transparent bg-accent px-4 py-1 sm:text-base"
              :class="{
                'shadow-box !border-green-500 shadow-green-500': option.is_selected && option.is_correct,
                'shadow-box !border-red-500 shadow-red-500': option.is_selected && !option.is_correct,
              }"
            >
              <div class="flex flex-1 items-center gap-1">
                <span class="font-bold">{{ answerLabels[i] }}.</span>
                <span v-html="option.text"></span>
              </div>
            </li>
          </ul>
          <div class="mt-2.5 flex min-h-14 items-center justify-between rounded-xl bg-secondary bg-opacity-30 px-4 py-1">
            <strong class="text-base font-semibold">Tushuntirish</strong>
            <UiButton class="h-auto px-2" variant="outline" disabled>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_711_3809)">
                  <path
                    d="M8.33203 9.9987C8.33203 10.4407 8.50763 10.8646 8.82019 11.1772C9.13275 11.4898 9.55667 11.6654 9.9987 11.6654C10.4407 11.6654 10.8646 11.4898 11.1772 11.1772C11.4898 10.8646 11.6654 10.4407 11.6654 9.9987C11.6654 9.55667 11.4898 9.13275 11.1772 8.82019C10.8646 8.50763 10.4407 8.33203 9.9987 8.33203C9.55667 8.33203 9.13275 8.50763 8.82019 8.82019C8.50763 9.13275 8.33203 9.55667 8.33203 9.9987Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M17.5 10C15.5 13.3333 13 15 10 15C7 15 4.5 13.3333 2.5 10C4.5 6.66667 7 5 10 5C13 5 15.5 6.66667 17.5 10Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_711_3809"><rect width="20" height="20" fill="white"></rect></clipPath>
                </defs>
              </svg>
              Ko'rsatish
            </UiButton>
          </div>
        </div>
        <UiDialogFooter class="!gap-4">
          <UiDialogClose>
            <UiButton variant="outline"> Yopish </UiButton>
          </UiDialogClose>
          <UiButton type="submit" disabled> Topshirish </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script setup>
  defineProps({
    question: {
      type: Object,
      required: true,
    },
  });
  const answerLabels = ref(["A", "B", "C", "D", "E", "F", "G", "H"]);

  const isOpen = ref(false);
</script>
