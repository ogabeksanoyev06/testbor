<template>
  <div class="h-full flex-1">
    <div class="sticky top-0 z-50 w-full bg-card py-2 lg:hidden">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-1">
          <span class="shrink-0">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M18.3327 10.0003C18.3327 14.6003 14.5993 18.3337 9.99935 18.3337C5.39935 18.3337 1.66602 14.6003 1.66602 10.0003C1.66602 5.40033 5.39935 1.66699 9.99935 1.66699C14.5993 1.66699 18.3327 5.40033 18.3327 10.0003Z"
                stroke="hsl(var(--primary))"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.0914 12.6505L10.5081 11.1088C10.0581 10.8421 9.69141 10.2005 9.69141 9.67546V6.25879"
                stroke="hsl(var(--primary))"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span class="text-sm font-medium leading-5">Vaqt qoldi:</span>
        </div>
        <span class="text-nowrap text-2xl font-bold text-primary" style="font-variant-numeric: tabular-nums">
          {{ timerFormat(testTimer) }}
        </span>
      </div>
      <div></div>
    </div>
    <section class="relative grid gap-6 lg:grid-cols-[400px_minmax(0,1fr)]">
      <aside class="order-2 lg:order-1">
        <div class="top-4 z-20 flex w-full flex-col gap-4 lg:sticky lg:h-[calc(100vh-50px)]">
          <div class="hidden items-center gap-4 rounded-sm border border-dashed border-gray-200 px-4 py-3 lg:flex lg:justify-between">
            <div class="flex items-center gap-1">
              <span class="shrink-0">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M18.3327 10.0003C18.3327 14.6003 14.5993 18.3337 9.99935 18.3337C5.39935 18.3337 1.66602 14.6003 1.66602 10.0003C1.66602 5.40033 5.39935 1.66699 9.99935 1.66699C14.5993 1.66699 18.3327 5.40033 18.3327 10.0003Z"
                    stroke="hsl(var(--primary))"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.0914 12.6505L10.5081 11.1088C10.0581 10.8421 9.69141 10.2005 9.69141 9.67546V6.25879"
                    stroke="hsl(var(--primary))"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span class="text-sm font-medium leading-5">Vaqt qoldi:</span>
            </div>
            <span class="text-nowrap text-2xl font-bold text-primary" style="font-variant-numeric: tabular-nums">
              {{ timerFormat(testTimer) }}
            </span>
          </div>
          <div class="invisible-scroll relative flex flex-col gap-4 overflow-y-auto rounded-sm border border-dashed border-gray-200">
            <div class="z-10 flex items-center justify-between border-b bg-white border-border/50 px-4 py-4 lg:sticky lg:top-0">
              <span class="text-base font-medium">Barcha testlar</span>
              <span class="text-sm font-medium opacity-50">{{ selectedAnswersCount }}/{{ totalQuestionsCount }}</span>
            </div>
            <div class="flex flex-col gap-4 px-4">
              <div class="flex flex-col gap-2" v-for="(test, i) in tests.blogs" :key="i">
                <p class="font-semibold">{{ test?.science?.name_uz }}</p>
                <div class="flex flex-wrap gap-1 gap-y-2 max-sm:justify-center">
                  <button
                    v-for="(question, index) in test.questions"
                    :key="question._id"
                    class="transition-300 flex h-9 w-9 items-center justify-center rounded-sm border-transparent bg-gray-200 opacity-70 shadow-inset hover:border-gray-300/25 hover:opacity-100 hover:shadow-[inset_0_4px_8px_0_rgba(0,0,0,0.3)]"
                    :class="{
                      '!bg-green-500/20 !opacity-100 !shadow-[inset_0_1px_4px_0_rgba(0,0,0,0.3)] !shadow-primary': isSelected(question.options),
                    }"
                    @click="scrollToQuestion(question._id)"
                  >
                    {{ index + 1 }}
                  </button>
                </div>
              </div>
            </div>
            <div class="w-full bg-white border-t border-border/50 px-4 py-4 lg:sticky lg:bottom-0">
              <div class="flex items-center gap-4">
                <div class="px-1">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1092_2540)">
                      <path d="M4 16H8" stroke="hsl(var(--primary))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M16 4V8" stroke="hsl(var(--primary))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M10.3982 10.4001L7.46484 7.4668" stroke="hsl(var(--primary))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M21.6016 10.4001L24.5349 7.4668" stroke="hsl(var(--primary))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M10.3982 21.5996L7.46484 24.5329" stroke="hsl(var(--primary))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M16 16L28 20L22.6667 22.6667L20 28L16 16Z" stroke="hsl(var(--primary))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_1092_2540">
                        <rect width="32" height="32" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <p class="mt-1 text-sm">Tanlangan javoblar</p>
                  <strong class="text-3xl font-semibold">{{ selectedAnswersCount }}</strong>
                </div>
                <div class="h-24 w-px bg-accent"></div>
                <div class="px-1">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1092_2548)">
                      <path
                        d="M13.332 15.9987C13.332 16.7059 13.613 17.3842 14.1131 17.8843C14.6132 18.3844 15.2915 18.6654 15.9987 18.6654C16.7059 18.6654 17.3842 18.3844 17.8843 17.8843C18.3844 17.3842 18.6654 16.7059 18.6654 15.9987C18.6654 15.2915 18.3844 14.6132 17.8843 14.1131C17.3842 13.613 16.7059 13.332 15.9987 13.332C15.2915 13.332 14.6132 13.613 14.1131 14.1131C13.613 14.6132 13.332 15.2915 13.332 15.9987Z"
                        stroke="hsl(var(--primary))"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M28 16C24.8 21.3333 20.8 24 16 24C11.2 24 7.2 21.3333 4 16C7.2 10.6667 11.2 8 16 8C20.8 8 24.8 10.6667 28 16Z"
                        stroke="hsl(var(--primary))"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_1092_2548">
                        <rect width="32" height="32" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <p class="mt-1 text-sm">Javoblar yo'q</p>
                  <strong class="text-3xl font-semibold">{{ unselectedAnswersCount }}</strong>
                </div>
              </div>
              <UiButton @click="finish" class="mt-4 h-11 w-full" :loading="loadingFinish">Testni yakunlash</UiButton>
            </div>
          </div>
        </div>
      </aside>
      <main class="order-1 flex flex-col gap-3 sm:gap-5 lg:order-2">
        <template v-for="(test, i) in tests.blogs" :key="i">
          <div class="top-4 z-20 flex w-full rounded-sm border border-dashed bg-white border-gray-200 p-2 sm:px-4 sm:py-3 lg:sticky">
            <h2 class="text-base font-bold sm:text-2xl sm:font-semibold">
              {{ test?.science?.name_uz }}
            </h2>
          </div>
          <div class="relative w-full" v-for="(question, index) in test?.questions" :key="question._id" :id="'section-' + question._id">
            <div class="pb-5">
              <div class="flex items-center justify-between">
                <h3 class="flex-1 text-base font-bold">{{ index + 1 }}. Mos keluvchi javobni tanlang.</h3>
                <ModalTestCommentNotification>
                  <UiButton class="h-auto p-1" variant="outline">
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
                    <span class="hidden md:inline">Izoh bildirish <span></span></span>
                  </UiButton>
                </ModalTestCommentNotification>
              </div>
              <div v-katex:auto v-html="question.question_text" />
            </div>
            <ul class="grid grid-cols-1 gap-3">
              <li
                v-for="(option, i) in question.options"
                @click="toggleQuestion(userRole, route.params.test_type, route.params.test_id, question._id, option._id, test?.test_type)"
                v-katex:auto
                class="transition-300 flex min-h-10 cursor-pointer items-center justify-between gap-1 overflow-x-auto overflow-y-hidden rounded-xl border-2 border-transparent bg-accent px-4 py-1 hover:border-black sm:min-h-14 sm:text-base"
                :class="{ 'shadow-box !border-black shadow-black': option.is_selected }"
              >
                <div class="flex flex-1 items-center gap-1">
                  <span class="font-bold">{{ answerLabels[i] }}.</span>
                  <span v-html="option.text"></span>
                </div>
                <span class="loader" v-if="loading.is_selected && option._id === optionIds"></span>
              </li>
            </ul>
            <div class="mt-5 border border-dashed"></div>
          </div>
        </template>
      </main>
    </section>
  </div>
</template>

<script setup>
  import { useCustomToast } from "@/composables/useCustomToast.js";
  import { useTestStore } from "@/stores/test.js";
  import { useRoute, useRouter } from "vue-router";

  definePageMeta({
    layout: "tests",
  });

  const route = useRoute();
  const router = useRouter();
  const userRole = useCookie("role");
  const { showToast } = useCustomToast();

  const testStore = useTestStore();
  const { getActiveTest, selectedQuestion, finishTest } = testStore;
  const { totalQuestionsCount, selectedAnswersCount, unselectedAnswersCount, loading, testTimer, tests } = storeToRefs(testStore);

  const answerLabels = ref(["A", "B", "C", "D", "E", "F", "G", "H"]);
  const optionIds = ref("");

  const timerInterval = ref(null);
  const loadingFinish = ref(false);

  const renderText = (text) => {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  const isSelected = (options) => {
    return options.some((option) => option.is_selected);
  };

  const scrollToQuestion = (questionId) => {
    const questionElement = document.getElementById(`section-${questionId}`);
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const setTimer = () => {
    if (timerInterval.value) {
      clearInterval(timerInterval.value);
    }
    timerInterval.value = setInterval(() => {
      if (testTimer.value <= 0) {
        clearInterval(timerInterval.value);
        timerInterval.value = null;
        finish();
      } else {
        testTimer.value--;
      }
    }, 1000);
  };

  const toggleQuestion = async (userRole, test_type, test_id, questionId, optionId, test_type_secondary) => {
    try {
      optionIds.value = optionId;
      const response = await selectedQuestion(userRole, test_type, test_id, questionId, optionId, test_type_secondary);
      if (response.status === "success") {
        tests.value?.blogs?.forEach((blog) => {
          const question = blog?.questions.find((q) => q._id === questionId);
          if (question) {
            question.options.forEach((opt) => {
              opt.is_selected = opt._id === optionId;
            });
          }
        });
        tests.value = { ...tests.value };
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
  };

  const finish = async () => {
    try {
      loadingFinish.value = true;
      const response = await finishTest(userRole.value, route.params.test_type, route.params.test_id);
      if (response.status === "success") {
        showToast("Test muvaffaqiyatli yakunlandi!", "success");
        router.push(`/test-attempt-results/${route.params.test_id}`);
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    } finally {
      loadingFinish.value = false;
    }
  };

  const { data, pending } = await useAsyncData("test-start", () => getActiveTest(userRole.value, route.params.test_type, route.params.test_id));

  onMounted(() => {
    setTimer();
  });

  onUnmounted(() => {
    clearInterval(timerInterval.value);
  });
</script>

<style scoped>
  .loader {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(0, 0, 0, 0.3);
    border-top: 3px solid #000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
