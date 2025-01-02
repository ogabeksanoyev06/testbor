<template>
  <div class="grid gap-6 pb-10">
    <section class="">
      <div class="flex flex-wrap items-center justify-center gap-6">
        <div class="w-full rounded-full border border-primary bg-background text-center" style="max-width: 250px; font-size: xx-large">
          <span>{{ result.correct_answers }}</span>
          <span style="font-size: large">/{{ result.questions_count }}</span>
        </div>
        <div class="ms-2 w-full border border-primary bg-background text-center" style="max-width: 250px; font-size: xx-large">{{ timerFormat(duration) }}</div>
      </div>
    </section>
    <section class="">
      <h2 class="mx-auto mb-4 max-w-[600px] text-center text-xl font-medium">Sinov yakunlandi. Hurmatli foydalanuvchi siz natijangiz bilan tanishib chiqishingiz mumkin.</h2>
      <div class="overflow-x-auto rounded-xl border">
        <UiTable class="text-center font-medium">
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead class="border-r text-center font-semibold">Hudud nomi</UiTableHead>
              <UiTableHead class="border-r text-center font-semibold">Tuman (shahar) nomi</UiTableHead>
              <UiTableHead class="border-r text-center font-semibold">Maktab</UiTableHead>
              <UiTableHead class="border-r text-center font-semibold" v-if="userRole !== 'teacher'">Sinf</UiTableHead>
              <UiTableHead class="border-r text-center font-semibold">Test boshlanish vaqti</UiTableHead>
              <UiTableHead class="border-r text-center font-semibold">Test tugatish vaqti</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow>
              <UiTableCell class="border-r py-3">{{ user.region }} </UiTableCell>
              <UiTableCell class="border-r py-3">{{ user.district }} </UiTableCell>
              <UiTableCell class="border-r py-3">{{ user.school }} </UiTableCell>
              <UiTableCell class="border-r py-3" v-if="userRole !== 'teacher'">{{ user.class }} </UiTableCell>
              <UiTableCell class="border-r py-3">{{ $dayjs(result.startedAt).format("DD.MM.YYYY HH:mm:ss") }} </UiTableCell>
              <UiTableCell class="border-r py-3">{{ $dayjs(result.endedAt).format("DD.MM.YYYY HH:mm:ss") }} </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </div>

      <div class="mt-6 overflow-x-auto rounded-xl border" v-if="result.test_type === 'attestation'">
        <UiTable class="text-center font-medium">
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead class="border-r text-center font-semibold">Attestatsiya turi </UiTableHead>
              <UiTableHead class="border-r text-center font-semibold">Amaldagi toifangiz</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow>
              <UiTableCell class="border-r py-3">Navbatdagi </UiTableCell>
              <UiTableCell class="border-r py-3">Oliy </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </div>
      <div class="mt-6 overflow-x-auto rounded-xl border" v-if="result.test_type === 'national_certificate'">
        <UiTable class="text-center font-medium">
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead class="border-r text-center font-semibold">Sizning natijangiz </UiTableHead>
              <UiTableHead class="border-r text-center font-semibold">Daraja</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow>
              <UiTableCell class="border-r py-3">{{ result.score }}% </UiTableCell>
              <UiTableCell class="border-r py-3">{{ getGrade(result.score) }} </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </div>
      <div v-if="result.test_type === 'attestation'">
        <div class="mt-6 flex w-full flex-col items-center justify-center gap-2 rounded-xl border p-4 text-center">
          <p class="text-xl font-bold text-primary">Tashxis</p>
          <p class="text-green-500" :class="{ 'text-red-500': result.correct_answers * 2 < 50 }">
            {{ getDiagnosis(result?.comments?.toifa, result.correct_answers * 2) }}
          </p>
        </div>
      </div>
    </section>

    <section class="">
      <div class="mb-6 hidden text-xl font-medium lg:block">Sizning javoblaringiz</div>
      <div class="relative">
        <div class="flex flex-col gap-4 sm:gap-6">
          <div class="flex flex-col gap-2" v-for="(test, i) in result.results" :key="i">
            <p class="text-base font-medium sm:text-xl">{{ test.science?.name_uz }}</p>
            <div class="flex flex-wrap gap-2">
              <ModalTestQuestionInfoModal v-for="(question, index) in test.questions" :key="index" :question="question">
                <button
                  class="transition-300 flex h-9 w-9 items-center justify-center rounded-xl font-medium opacity-100"
                  :class="{
                    '!bg-primary': isCorrect(question),
                    '!bg-destructive': isSelectedIncorrect(question),
                    '!bg-secondary': !isAnySelected(question),
                  }"
                >
                  {{ index + 1 }}
                </button>
              </ModalTestQuestionInfoModal>
            </div>
          </div>
        </div>
      </div>
    </section>
    <NuxtLink :to="localePath('/test-attempt-results')" class="mx-auto w-full max-w-[300px]">
      <UiButton class="w-full"> Mening natijalarim </UiButton>
    </NuxtLink>
  </div>
</template>

<script setup>
  import { useProfileStore } from "@/stores/profile.js";
  import { useTestStore } from "@/stores/test.js";

  const localePath = useLocalePath();

  const testStore = useTestStore();
  const profileStore = useProfileStore();

  const { getResultById } = testStore;
  const { user } = storeToRefs(profileStore);

  const { result } = storeToRefs(testStore);

  const route = useRoute();
  const userRole = useCookie("role");

  const answerLabels = ref(["A", "B", "C", "D", "E", "F", "G", "H"]);
  const diagnosisRules = {
    highest: {
      passed: {
        minScore: 80,
        message: "Attestatsiyadan o‘tdi, oliy malaka toifasi (bosh o‘qituvchi lavozimi) saqlansin",
      },
      failed: {
        maxScore: 79,
        message: "Attestatsiyadan o‘tmadi, birinchi malaka toifasi (yetakchi o‘qituvchi lavozimi) ga tushirilsin",
      },
    },
    first: {
      passedHighest: {
        minScore: 80,
        message: "Attestatsiyadan o‘tdi, oliy malaka toifasi (bosh o‘qituvchi lavozimi) berilsin",
      },
      passedFirst: {
        minScore: 70,
        maxScore: 79,
        message: "Attestatsiyadan o‘tdi, birinchi malaka toifasi (yetakchi o‘qituvchi lavozimi) saqlansin",
      },
      failed: {
        maxScore: 69,
        message: "Attestatsiyadan o‘tmadi, ikkinchi malaka toifasi (katta o‘qituvchi lavozimi) ga tushirilsin",
      },
    },
    second: {
      passedFirst: {
        minScore: 70,
        message: "Attestatsiyadan o‘tdi, birinchi malaka toifasi (yetakchi o‘qituvchi lavozimi) berilsin",
      },
      passedSecond: {
        minScore: 60,
        maxScore: 69,
        message: "Attestatsiyadan o‘tdi, ikkinchi malaka toifasi (katta o‘qituvchi lavozimi) saqlansin",
      },
      failed: {
        maxScore: 59,
        message: "Attestatsiyadan o‘tmadi, mutaxassis (oliy ma’lumotli o‘qituvchi) lavozimiga tushirilsin",
      },
    },
    specialist: {
      passedSecond: {
        minScore: 60,
        message: "Attestatsiyadan o‘tdi, ikkinchi malaka toifasi (katta o‘qituvchi lavozimi) berilsin",
      },
      failed: {
        maxScore: 59,
        message: "Attestatsiyadan o‘tmadi, mutaxassis (oliy ma’lumotli o‘qituvchi) saqlansin",
      },
    },
  };

  const getDiagnosis = (category, totalScore) => {
    const rules = diagnosisRules[category];
    if (category === "highest") {
      if (totalScore >= rules.passed.minScore) {
        return rules.passed.message;
      } else {
        return rules.failed.message;
      }
    }
    if (category === "first") {
      if (totalScore >= rules.passedHighest.minScore) {
        return rules.passedHighest.message;
      } else if (totalScore >= rules.passedFirst.minScore && totalScore <= rules.passedFirst.maxScore) {
        return rules.passedFirst.message;
      } else {
        return rules.failed.message;
      }
    }
    if (category === "second") {
      if (totalScore >= rules.passedFirst.minScore) {
        return rules.passedFirst.message;
      } else if (totalScore >= rules.passedSecond.minScore && totalScore <= rules.passedSecond.maxScore) {
        return rules.passedSecond.message;
      } else {
        return rules.failed.message;
      }
    }
    if (category === "specialist") {
      if (totalScore >= rules.passedSecond.minScore) {
        return rules.passedSecond.message;
      } else {
        return rules.failed.message;
      }
    }
    return "Tashxis aniqlanmadi";
  };

  const getGrade = (score) => {
    if (score >= 90) {
      return "A+";
    } else if (score >= 85) {
      return "A";
    } else if (score >= 80) {
      return "B+";
    } else if (score >= 75) {
      return "B";
    } else if (score >= 70) {
      return "C+";
    } else if (score >= 65) {
      return "C";
    } else {
      return "F";
    }
  };

  function isCorrect(question) {
    return question.options.some((option) => option.is_selected && option.is_correct);
  }

  function isSelectedIncorrect(question) {
    return question.options.some((option) => option.is_selected && !option.is_correct);
  }

  function isAnySelected(question) {
    return question.options.some((option) => option.is_selected);
  }

  const { data: results } = await useAsyncData("results", async () => {
    return await getResultById(userRole.value, route.params.id);
  });

  const duration = computed(() => {
    if (results.value) {
      const startedAt = result.value.startedAt;
      const endedAt = result.value.endedAt;
      return (endedAt - startedAt) / 1000;
    }
    return 0;
  });
</script>
