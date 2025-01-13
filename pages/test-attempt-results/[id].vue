<template>
  <div class="grid gap-5 pb-10">
    <section class="">
      <!-- {{ result.test_type_title }} -->
      <div class="flex flex-wrap items-center justify-center gap-6">
        <div class="relative w-full rounded-full border bg-background text-center" style="max-width: 250px; font-size: xx-large">
          <span>{{ result.correct_answers }}</span>
          <span style="font-size: large" class="text-primary">/{{ result.questions_count }}</span>
        </div>
        <div class="ms-2 w-full border border-primary bg-background text-center" style="max-width: 250px; font-size: xx-large">{{ timerFormat(duration) }}</div>
      </div>
    </section>
    <section class="grid gap-6">
      <!-- <h2 class="mx-auto max-w-[900px] text-center text-xl font-medium">Sinov yakunlandi. Hurmatli foydalanuvchi siz natijangiz bilan tanishib chiqishingiz mumkin.</h2> -->
      <!-- user info -->
      <div class="overflow-x-auto border">
        <UiTable class="text-center font-medium">
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead class="border-r text-center">Hudud nomi</UiTableHead>
              <UiTableHead class="border-r text-center">Tuman (shahar) nomi</UiTableHead>
              <UiTableHead class="border-r text-center">Maktab</UiTableHead>
              <UiTableHead class="border-r text-center" v-if="userRole !== 'teacher'">Sinf</UiTableHead>
              <UiTableHead class="border-r text-center">Test turi</UiTableHead>
              <UiTableHead class="border-r text-center">Test boshlanish vaqti</UiTableHead>
              <UiTableHead class="border-r text-center">Test tugatish vaqti</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow>
              <UiTableCell class="border-r py-3">{{ user.region }} </UiTableCell>
              <UiTableCell class="border-r py-3">{{ user.district }} </UiTableCell>
              <UiTableCell class="border-r py-3">{{ user.school }} </UiTableCell>
              <UiTableCell class="border-r py-3" v-if="userRole !== 'teacher'">{{ user.class }} </UiTableCell>
              <UiTableCell class="border-r py-3">{{ result.test_type_title }}</UiTableCell>
              <UiTableCell class="border-r py-3">{{ $dayjs(result.startedAt).format("DD.MM.YYYY HH:mm:ss") }} </UiTableCell>
              <UiTableCell class="border-r py-3">{{ $dayjs(result.endedAt).format("DD.MM.YYYY HH:mm:ss") }} </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </div>
      <!-- attestasiya tashxix -->
      <div class="overflow-x-auto border" v-if="result.test_type === 'attestation'">
        <UiTable class="text-center font-medium">
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead class="border-r text-center">Attestatsiya turi </UiTableHead>
              <UiTableHead class="border-r text-center">Amaldagi toifangiz</UiTableHead>
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
      <!-- sertifikat daraja -->
      <div class="overflow-x-auto border" v-if="result.test_type === 'national_certificate'">
        <UiTable class="text-center font-medium">
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead class="border-r text-center">Sizning natijangiz </UiTableHead>
              <UiTableHead class="border-r text-center">Daraja</UiTableHead>
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
        <div class="mt-6 flex w-full flex-col items-center justify-center gap-2 border p-4 text-center">
          <!-- <p class="text-xl font-bold text-primary">Tashxis</p> -->
          <p class="text-green-500" :class="{ 'text-red-500': result.correct_answers * 2 < 50 }">
            {{ getDiagnosis(result?.comments?.toifa, result.correct_answers * 2) }}
          </p>
        </div>
      </div>

      <div class="overflow-x-auto border">
        <UiTable class="text-center font-medium">
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead class="border-r text-center">Fan</UiTableHead>
              <UiTableHead class="border-r text-center">Soni</UiTableHead>
              <UiTableHead class="border-r text-center">To'g'rilar</UiTableHead>
              <UiTableHead class="border-r text-center">Xatolar</UiTableHead>
              <UiTableHead class="border-r text-center">Belgilanmagan</UiTableHead>
              <UiTableHead class="border-r text-center">Ball</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="(test, i) in result.results" class="odd:!bg-muted">
              <UiTableCell class="border-r py-3">{{ test.science?.name_uz }} </UiTableCell>
              <UiTableCell class="border-r py-3">{{ test.questions?.length }} </UiTableCell>
              <UiTableCell class="border-r py-3">{{ calculateCorrectAnswers(test.questions) }} </UiTableCell>
              <UiTableCell class="border-r py-3">{{ calculateIncorrectAnswers(test.questions) }} </UiTableCell>
              <UiTableCell class="border-r py-3">{{ calculateUnselectedAnswers(test.questions) }} </UiTableCell>
              <UiTableCell class="border-r py-3">36 </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </div>
    </section>

    <div class="relative mt-6">
      <h3 class="mb-4 font-semibold max-sm:text-center">
        Test variant raqami<strong class="text-primary"> №{{ result._id }}</strong>
      </h3>
      <div class="flex flex-col gap-4 sm:gap-6">
        <div class="grid gap-2" v-for="(test, i) in result.results" :key="i">
          <p class="text-base font-semibold max-sm:text-center">{{ test.science?.name_uz }}</p>
          <div class="flex flex-wrap gap-2 max-sm:justify-center">
            <ModalTestQuestionInfoModal v-for="(question, index) in test.questions" :key="index" :question="question">
              <UiButton class="h-[30px] w-[30px] shadow" :variant="isCorrect(question) ? 'default' : isSelectedIncorrect(question) ? 'destructive' : 'secondary'">
                {{ index + 1 }}
              </UiButton>
            </ModalTestQuestionInfoModal>
          </div>
        </div>
      </div>
    </div>

    <NuxtLink :to="localePath('/test-attempt-results')" class="mx-auto w-full max-w-[300px]">
      <UiButton class="w-full"> Mening natijalarim </UiButton>
    </NuxtLink>
    <NuxtLink :to="localePath('/test-attempt-results')" class="mx-auto w-full max-w-[300px]" v-if="result.test_type === 'dtm'">
      <UiButton class="w-full" variant="outline"> Solishtirish </UiButton>
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

  // To'g'ri javoblar sonini hisoblash funksiyasi
  const calculateCorrectAnswers = (questions) => {
    return questions.reduce((count, question) => {
      return count + question.options.filter((option) => option.is_correct && option.is_selected).length;
    }, 0);
  };

  // Xato javoblar sonini hisoblash funksiyasi
  const calculateIncorrectAnswers = (questions) => {
    return questions.reduce((count, question) => {
      return count + question.options.filter((option) => !option.is_correct && option.is_selected).length;
    }, 0);
  };

  // Belgilanmagan javoblarni hisoblash
  const calculateUnselectedAnswers = (questions) => {
    return questions.reduce((count, question) => {
      // Agar barcha javoblar tanlanmagan bo'lsa, 1 ga oshirish
      return count + (question.options.every((option) => !option.is_selected) ? 1 : 0);
    }, 0);
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
