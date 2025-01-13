<template>
  <div class="mx-auto mt-10 w-full rounded-lg bg-card p-4 shadow-md">
    <VForm @submit="handleSubmitForm" v-slot="{ errors }">
      <div class="grid gap-4 lg:grid-cols-12">
        <div class="grid gap-3 lg:col-span-6">
          <VField name="langnm" rules="required" v-model="form.langnm">
            <UiLabel>Ta'lim tili</UiLabel>
            <UiSelect v-model="form.langnm">
              <UiSelectTrigger placeholder="Ta'lim tilini tanlang" />
              <UiSelectContent>
                <UiSelectLabel>Ta'lim tilini tanlang</UiSelectLabel>
                <UiSelectSeparator />
                <UiSelectGroup>
                  <UiSelectItem v-for="item in languages" :key="item.id" :value="item.value" :disabled="!item.status">
                    {{ item.name }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </VField>
        </div>
        <div class="grid gap-3 lg:col-span-6">
          <VField name="emnm" rules="required" v-model="form.emnm">
            <UiLabel>Ta'lim shakli</UiLabel>
            <UiSelect v-model="form.emnm" :disabled="!form.langnm">
              <UiSelectTrigger placeholder="Ta'lim shaklini tanlang" />
              <UiSelectContent>
                <UiSelectLabel>Ta'lim shaklini tanlang</UiSelectLabel>
                <UiSelectSeparator />
                <UiSelectGroup>
                  <UiSelectItem v-for="(item, key) in educationLevels" :key :value="item.value">
                    {{ item.name }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </VField>
        </div>
        <div class="grid gap-3 lg:col-span-6">
          <VField name="otm" rules="required" v-model="form.otm">
            <UiLabel>Universitet</UiLabel>
            <UiSelect v-model="form.otm" class="!p-0" :disabled="!form.emnm" @update:modelValue="fetchFaculties">
              <UiSelectTrigger placeholder="Universitetni tanlang" />
              <UiSelectContent class="w-full">
                <UiSelectLabel>Universitetni tanlang</UiSelectLabel>
                <UiSelectSeparator />
                <UiSelectGroup class="w-full !p-0">
                  <UiSelectItem class="w-full" v-for="item in filteredUniversities" :value="item.OTM" :key="item._id">
                    {{ item.OTM }}
                  </UiSelectItem>
                  <UiSelectItem v-if="filteredUniversities.length === 0" disabled> Universitet topilmadi </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </VField>
        </div>
        <div class="grid gap-3 lg:col-span-6">
          <VField name="dirid" rules="required" v-model="form.dirid">
            <UiLabel>Yo'nalish</UiLabel>
            <UiSelect v-model="form.dirid" :disabled="!form.otm" @update:modelValue="selectDirection">
              <UiSelectTrigger placeholder="Yo'nalishni tanlang" />
              <UiSelectContent>
                <UiSelectLabel>Yo'nalishni tanlang</UiSelectLabel>
                <UiSelectSeparator />
                <UiSelectGroup>
                  <UiSelectItem v-for="item in faculties.data" :key="item._id" :value="item.dirid">
                    {{ item.dirnm }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </VField>
        </div>
      </div>

      <div class="mt-10 overflow-x-auto rounded-lg border" v-if="form.dirid && selectedDirection && selectedDirection?.dirid && selectedDirection?.subject_1 && selectedDirection?.subject_2">
        <UiTable class="whitespace-nowrap text-center font-medium">
          <UiTableHeader>
            <UiTableRow class="!bg-muted">
              <UiTableHead class="text-center"> # </UiTableHead>
              <UiTableHead class="text-center">Majburiy fanlar</UiTableHead>
              <UiTableHead class="text-center">Testlar soni</UiTableHead>
              <UiTableHead class="text-center"> Ball</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow>
              <UiTableCell class="font-medium"> 1 </UiTableCell>
              <UiTableCell class="font-medium"> Ona tili (majburiy) </UiTableCell>
              <UiTableCell class="font-medium"> 10</UiTableCell>
              <UiTableCell class="font-medium"> 1.1 </UiTableCell>
            </UiTableRow>
            <UiTableRow>
              <UiTableCell class="font-medium"> 2 </UiTableCell>
              <UiTableCell class="font-medium"> Matematika (majburiy) </UiTableCell>
              <UiTableCell class="font-medium"> 10</UiTableCell>
              <UiTableCell class="font-medium"> 1.1 </UiTableCell>
            </UiTableRow>
            <UiTableRow>
              <UiTableCell class="font-medium"> 3 </UiTableCell>
              <UiTableCell class="font-medium"> O'zbekiston tarixi (majburiy) </UiTableCell>
              <UiTableCell class="font-medium"> 10</UiTableCell>
              <UiTableCell class="font-medium"> 1.1 </UiTableCell>
            </UiTableRow>
            <UiTableRow class="!border-b text-center">
              <UiTableCell colSpan="2" class="font-bold"> Umumiy ball </UiTableCell>
              <UiTableCell colSpan="2" class="font-bold"> 33 </UiTableCell>
            </UiTableRow>
          </UiTableBody>
          <UiTableHeader>
            <UiTableRow class="!bg-muted">
              <UiTableHead class="text-center"> # </UiTableHead>
              <UiTableHead class="text-center">Asosiy fanlar</UiTableHead>
              <UiTableHead class="text-center">Testlar soni</UiTableHead>
              <UiTableHead class="text-center"> Ball</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody class="text-center">
            <UiTableRow>
              <UiTableCell class="font-medium"> 1 </UiTableCell>
              <UiTableCell class="font-medium"> {{ selectedDirection?.subject_1?.name_uz }} </UiTableCell>
              <UiTableCell class="font-medium"> 30</UiTableCell>
              <UiTableCell class="font-medium"> 3.1 </UiTableCell>
            </UiTableRow>
            <UiTableRow>
              <UiTableCell class="font-medium"> 2 </UiTableCell>
              <UiTableCell class="font-medium"> {{ selectedDirection?.subject_2?.name_uz }} </UiTableCell>
              <UiTableCell class="font-medium"> 30</UiTableCell>
              <UiTableCell class="font-medium"> 2.1 </UiTableCell>
            </UiTableRow>
            <UiTableRow>
              <UiTableCell colSpan="2" class="font-bold"> Umumiy ball </UiTableCell>
              <UiTableCell colSpan="2" class="font-bold"> 156 </UiTableCell>
            </UiTableRow>
            <UiTableRow>
              <UiTableCell colSpan="2" class="font-bold"> 5ta fan bo'yicha umumiy ball </UiTableCell>
              <UiTableCell colSpan="2" class="font-bold"> 189 </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </div>

      <div class="mt-10 flex justify-center">
        <UiButton type="submit" class="" :loading="loading"> Testni boshlash </UiButton>
      </div>
    </VForm>
  </div>
</template>

<script setup>
  import { useCustomToast } from "@/composables/useCustomToast.js";
  import { useTestStore } from "@/stores/test.js";
  import { useUniversitiesStore } from "@/stores/universities.js";
  import { useRoute, useRouter } from "vue-router";

  const route = useRoute();
  const router = useRouter();
  const userRole = useCookie("role");

  const { showToast } = useCustomToast();

  const testStore = useTestStore();
  const universitiesStore = useUniversitiesStore();

  const { startTest } = testStore;
  const { getSearchUniversity, getAllFaculty } = universitiesStore;

  const loading = ref(false);
  const loadingFaculties = ref(false);
  const search = ref("");

  const faculties = ref([]);
  const selectedDirection = ref({});

  const form = reactive({
    emnm: "",
    langnm: "O`zbek",
    otm: "",
    dirid: "",
  });

  const fetchFaculties = async () => {
    try {
      loadingFaculties.value = true;
      faculties.value = await getAllFaculty({
        OTM: form.otm,
        emnm: form.emnm,
        langnm: form.langnm,
      });
    } catch (error) {
      console.log(error);
    } finally {
      loadingFaculties.value = false;
    }
  };

  const selectDirection = () => {
    selectedDirection.value = faculties.value.data.find((faculty) => faculty.dirid === form.dirid);
  };

  const filteredUniversities = computed(() => {
    if (!search.value) return universities.value.data;
    return universities.value.data.filter((university) => university.OTM.toLowerCase().includes(search.value.toLowerCase()));
  });

  const handleSubmitForm = async () => {
    try {
      loading.value = true;
      const response = await startTest(userRole.value, route.params.test_type, route.params.test_type_id, selectedDirection.value._id);
      if (response.status === "success") {
        const redirectUrl = `/active-test/${route.params.test_type}/${response.data._id}`;
        router.push(redirectUrl);
        showToast("Test muvaffaqiyatli boshlandi!", "success");
        sideCannonConfetti();
      }
    } catch (error) {
      showToast(error.response.data.message, "info");
      console.log(error);
      const redirectUrl = `/active-test/${route.params.test_type}/${error.response?.data?.data.active_test_id}`;
      router.push(redirectUrl);
    } finally {
      loading.value = false;
    }
  };

  const { data: universities } = await useAsyncData("universities", async () => {
    return await getSearchUniversity({ search: search.value });
  });
</script>
