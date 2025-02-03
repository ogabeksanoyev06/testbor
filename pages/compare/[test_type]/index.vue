<script setup>
  import { useTestStore } from "@/stores/test.js";
  import { useUniversitiesStore } from "@/stores/universities.js";
  import { useRoute } from "vue-router";

  const route = useRoute();
  const testType = route.params.test_type;
  const userRole = useCookie("role");

  const universitiesStore = useUniversitiesStore();
  const testStore = useTestStore();

  const { getUniversitiesBySubjectsIds } = universitiesStore;
  const { getResultById } = testStore;
  const { result } = storeToRefs(testStore);

  const subjects = route.query.subjects?.split(",") || [];
  const allQuestions = ref([]);

  const totalScore = calculateTotalScore(allQuestions.value, "dtm").totalScore;

  const totalGrands = computed(() => {
    return (
      universities.data?.filter((university) => {
        return university.ballgr !== 0 && Number(totalScore) >= university.ballgr;
      }).length || 0
    );
  });

  const totalContracts = computed(() => {
    return (
      universities.data?.filter((university) => {
        return university.ballgr !== 0 && university.ballk !== 0 && Number(totalScore) <= university.ballgr && Number(totalScore) >= university.ballk;
      }).length || 0
    );
  });

  const { data: compare } = await useAsyncData("compare", async () => {
    const [universities, compareResult] = await Promise.all([
      getUniversitiesBySubjectsIds({ subject_1: Number(subjects[0]), subject_2: Number(subjects[1]) }),
      getResultById(userRole.value, testType),
    ]);
    return { universities, compareResult };
  });

  const options = {
    dom: `
  <'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5 lg:pr-1'B>
  <'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5 lg:pr-1'lf>
  <'border rounded-lg ${tw`overflow-auto`}'t>
  <'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-2 p-5'ip>
`,
    autoWidth: true,
    select: true,
    ordering: true,
    order: [],
    buttons: ["copy", "excel", "pdf", "print"],
    language: {
      info: "Ko'rsatilgan: _START_ dan _END_ gacha, jami _TOTAL_ ta yozuv",
      infoEmpty: "Ko'rsatilgan: 0 ta yozuv",
      lengthMenu: "Soni _MENU_",
      search: "Qidirish:",
    },
    columns: [
      { data: "OTM", title: "Universitet" },
      { data: "dirnm", title: "Yo'nalish" },
      { data: "emnm", title: "Ta'lim shakli" },
      { data: "grantnm", title: "Grant soni" },
      { data: "contractnm", title: "Kontrakt soni" },
      { data: "ballgr", title: "Grant" },
      { data: "ballk", title: "Kontrakt" },
      { data: "status.text", title: "Status" },
    ],
    columnDefs: [
      {
        targets: "_all",
        render: function (data, type, row) {
          return `<div style="word-wrap: break-word; white-space: normal;">${data}</div>`;
        },
      },
      {
        targets: 7,
        createdCell: function (td, cellData, rowData) {
          const colors = {
            0: "text-red-500 font-semibold",
            1: "text-green-500 font-semibold",
            2: "text-yellow-500 font-semibold",
          };
          const colorClass = colors[rowData.status?.statusId] || "";
          if (colorClass) {
            colorClass.split(" ").forEach((cls) => td.classList.add(cls));
          }
        },
      },
    ],
    
  };

  let universities = compare.value.universities;
  const compareResult = compare.value.compareResult;
  allQuestions.value = [...compareResult.data?.main_test, ...compareResult.data?.third_test, ...compareResult.data?.secondary_test];

  universities.data = universities.data.map((university) => {
    let status = {};
    if (university.ballgr !== 0 && Number(totalScore) >= university.ballgr) {
      status = {
        text: "Grand",
        statusId: 1,
      };
    } else if (university.ballk !== 0 && university.ballgr !== 0 && Number(totalScore) >= university.ballk && Number(totalScore) < university.ballgr) {
      status = {
        text: "Kontrakt",
        statusId: 2,
      };
    } else {
      status = {
        text: "Yiqildi",
        statusId: 0,
      };
    }

    return {
      ...university,
      status: status,
    };
  });
  const targetUniversityId = compareResult.data.dtm_university_id;
  const sortedUniversities = universities.data.sort((a, b) => {
    if (a._id === targetUniversityId) return -1;
    if (b._id === targetUniversityId) return 1;
    return 0;
  });
  universities.data = sortedUniversities;
</script>

<template>
  <div>
    <div class="mx-auto mb-2 border border-primary text-center" style="max-width: 200px; font-size: x-large">
      <span id="rating">{{ calculateTotalScore(allQuestions, "dtm").totalScore }}</span>
      <span style="font-size: medium">/{{ calculateTotalScore(allQuestions, "dtm").maxBall }}</span>
    </div>
    <div class="mx-auto mb-4 max-w-2xl text-center font-semibold" style="font-size: large">
      O'tgan yilgi turdosh yo'nalishlar bo'yicha o'tish ballari va siz to'plagan ballga nisbatatan solishtirish natijasi
    </div>
    <div class="mb-4 flex flex-wrap justify-center gap-3">
      <UiButton variant="outline" class="border-foreground uppercase"> Hammasi: {{ universities.data?.length }} </UiButton>
      <UiButton variant="outline" class="border-primary uppercase"> Grand: {{ totalGrands }} </UiButton>
      <UiButton variant="outline" class="border-yellow-500 uppercase"> Kontrakt: {{ totalContracts }} </UiButton>
    </div>
    <div class="overflow-hidden bg-background">
      <UiDatatable class="nowrap compact hover" :data="universities.data" :options="options" />
    </div>
  </div>
</template>

<style></style>
