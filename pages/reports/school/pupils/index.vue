<template>
  <div>
    <VForm @submit="handleSubmitForm" v-slot="{ errors }" class="flex flex-col items-center gap-6">
      <div class="grid w-full gap-4 md:grid-cols-2">
        <div class="grid gap-2">
          <VField name="type" rules="required" v-model="form.type">
            <UiLabel>Hisbot test turini tanlang</UiLabel>
            <UiSelect v-model="form.type" @update:model-value="updateTestType">
              <UiSelectTrigger class="w-full" :error="errors.type">
                <UiSelectValue placeholder="Hisbot test turini tanlang" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectGroup>
                  <UiSelectItem v-for="item in pupilTestTypes" :key="item._id" :value="String(item._id)">
                    {{ item.title_uz }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </VField>
        </div>
        <div class="grid gap-2" v-if="form.type === '15'">
          <VField name="class" rules="required" v-model="form.class">
            <UiLabel>Sinfni tanlang</UiLabel>
            <UiSelect v-model="form.class" @update:model-value="getSubjectsByTypeId" :disabled="!form.type">
              <UiSelectTrigger class="w-full" :error="errors.class">
                <UiSelectValue placeholder="Sinfni tanlang" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectGroup>
                  <UiSelectItem v-for="item in classesData" :key="item.id" :value="String(item.id)">
                    {{ item.number }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </VField>
        </div>
        <div class="grid gap-2">
          <VField name="subject" rules="required" v-model="form.subject">
            <UiLabel>Fanni tanlang</UiLabel>
            <UiSelect v-model="form.subject" :disabled="form.type === '15' ? !form.class : !form.type">
              <UiSelectTrigger class="w-full" :error="errors.subject">
                <UiSelectValue placeholder="Fanni tanlang" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectGroup>
                  <UiSelectItem v-for="(item, i) in subjects" :key="item._id" :value="String(item._id)">
                    {{ item.name_uz }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </VField>
        </div>
        <div class="grid gap-2">
          <VField name="startDate" rules="required" v-model="form.startDate">
            <UiLabel>Dan:</UiLabel>
            <UiDatepicker v-model="form.startDate" locale="uz">
              <template #default="{ togglePopover }">
                <UiButton variant="outline" :class="[!form.startDate && 'text-muted-foreground', 'w-full flex-row-reverse justify-between text-left']" @click="togglePopover">
                  <Icon name="lucide:calendar" class="h-4 w-4" />
                  {{ form.startDate ? dayjs(form.startDate).format("DD/MM/YYYY") : "Tanlang" }}
                </UiButton>
              </template>
            </UiDatepicker>
          </VField>
        </div>
        <div class="grid gap-2">
          <VField name="endDate" rules="required" v-model="form.endDate">
            <UiLabel>Gacha:</UiLabel>
            <UiDatepicker v-model="form.endDate" locale="uz">
              <template #default="{ togglePopover }">
                <UiButton variant="outline" :class="[!form.endDate && 'text-muted-foreground', 'w-full flex-row-reverse justify-between text-left']" @click="togglePopover">
                  <Icon name="lucide:calendar" class="h-4 w-4" />
                  {{ form.endDate ? dayjs(form.endDate).format("DD/MM/YYYY") : "Tanlang" }}
                </UiButton>
              </template>
            </UiDatepicker>
          </VField>
        </div>
      </div>
      <div class="w-full max-w-xs">
        <UiButton type="submit" class="w-full"> Saqlash </UiButton>
      </div>
    </VForm>
  </div>
</template>

<script setup>
  import { useSchoolStore } from "@/stores/school.js";
  import dayjs from "dayjs";

  const schoolStore = useSchoolStore();
  const { getAllTestTypes, getSubjects, getFilterPupilResults } = schoolStore;

  const form = reactive({
    type: "",
    subject: "",
    class: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  const subjects = ref([]);

  const getSubjectsByTypeId = async () => {
    form.subject = "";
    subjects.value = subjects.value.filter((subject) => subject.class === Number(form.class));
  };

  const updateTestType = async () => {
    subjects.value = [];
    form.subject = "";
    form.class = "";
    const res = await getSubjects(form.type);
    subjects.value = res.data;
    form.subject = "";
  };

  const handleSubmitForm = async () => {
    const res = await getFilterPupilResults({
      startDate: form.startDate.getTime(),
      endDate: form.endDate.getTime(),
      subject: form.subject,
      test_type_id: form.type,
    });
    console.log(res);
  };

  const pupilTestTypes = computed(() => {
    return types.value?.data.filter((test) => test.user_types.includes("pupils"));
  });

  const { data: types } = await useAsyncData("types", async () => {
    return await getAllTestTypes();
  });
</script>
