import { useApi } from "@/composables/useApi";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTestStore = defineStore("test", () => {
  const api = useApi();

  const loading = reactive({
    start_test: false,
    is_selected: false,
    is_finished: false,
  });

  const tests = ref({});
  const result = ref({});
  const testTimer = ref(0);

  const times = ref(0);

  const userRoleApiPath = {
    school: "schools",
    teacher: "teachers",
    pupil: "pupils",
    default: "users",
  };

  const getTestSchoolSubject = async (test_type_id) => {
    try {
      const url = `pupils/subjects/school/${test_type_id}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const getTime = async () => {
    try {
      const response = await api.get("info/time");
      if (response.data.status === "success") {
        times.value = Math.floor(response.data.data.time / 1000);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const getTestTypes = async (role) => {
    try {
      const apiPath = userRoleApiPath[role] || userRoleApiPath.default;
      const url = `${apiPath}/testtypes`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const getTestTypeSubject = async (role, test_type_id) => {
    try {
      const apiPath = userRoleApiPath[role] || userRoleApiPath.default;
      const url = `${apiPath}/subjects/${test_type_id}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const startTest = async (role, test_type, test_type_id, subject_id, data) => {
    try {
      loading.start_test = true;
      const apiPath = userRoleApiPath[role] || userRoleApiPath.default;
      const url = `${apiPath}/start-test/${test_type}/${test_type_id}/${subject_id}`;
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      loading.start_test = false;
    }
  };
  const getActiveTest = async (role, test_type, test_id) => {
    try {
      loading.start_test = true;
      const apiPath = userRoleApiPath[role];
      const url = `${apiPath}/get-test/${test_type}/${test_id}`;
      const response = await api.post(url);

      if (response.data.status === "success") {
        const testData = response.data?.data;
        await getTime();
        const startedAt = Math.floor(testData.startedAt / 1000);
        const duration = testData?.test_type_id?.duration;
        testTimer.value = Math.floor(startedAt + duration * 60 - times.value);
        let blogs = [];
        if (testData?.test_type_id?.test_type === "dtm") {
          if (testData?.main_test?.length > 0) {
            const questions = testData.main_test;
            blogs.push({
              science: {
                name_uz: "Ona tili (majburiy)",
              },
              test_type: "main",
              questions: questions.slice(0, 10),
            });
            blogs.push({
              science: {
                name_uz: "Matematika (majburiy)",
              },
              test_type: "main",
              questions: questions.slice(10, 20),
            });
            blogs.push({
              science: {
                name_uz: "O'zbekiston tarixi (majburiy)",
              },
              test_type: "main",
              questions: questions.slice(20, 30),
            });
          }
          if (testData?.secondary_test?.length > 0) {
            blogs.push({
              science: testData?.subject,
              test_type: "secondary",
              questions: testData.secondary_test,
            });
          }
          if (testData?.third_test?.length > 0) {
            blogs.push({
              science: testData?.subject_2,
              test_type: "third",
              questions: testData.third_test,
            });
          }
        } else {
          if (testData?.main_test?.length > 0) {
            blogs.push({
              science: testData?.subject,
              test_type: "main",
              questions: testData?.main_test,
            });
          }
          if (testData?.secondary_test?.length > 0) {
            blogs.push({
              science: testData?.subject_2,
              test_type: "secondary",
              questions: testData.secondary_test,
            });
          }
        }

        tests.value = {
          _id: testData._id,
          test_type: testData?.test_type_id?.test_type,
          test_type_id: testData?.test_type_id?._id,
          test_type_title: testData?.test_type_id?.title_uz,
          duration: testData?.test_type_id?.duration,
          questions_count: blogs?.reduce((count, blog) => count + blog?.questions?.length, 0),
          correct_answers: testData?.correct_answers,
          wrong_answers: testData?.wrong_answers,
          teacher: testData?.teacher,
          blogs: blogs,
          startedAt: testData?.startedAt,
          status: testData?.status,
          createdAt: testData?.createdAt,
          updatedAt: testData?.updatedAt,
          timeoutId: testData?.timeoutId,
        };
      }
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      loading.start_test = false;
    }
  };
  const selectedQuestion = async (role, test_type, activeTestId, mainTestId, optionId, test_type_secondary) => {
    try {
      loading.is_selected = true;
      const apiPath = userRoleApiPath[role];
      const url = `${apiPath}/update-test/${test_type}`;

      let payload;
      if (test_type === "dtm") {
        payload = {
          activeTestId: activeTestId,
          section: test_type_secondary,
          testId: mainTestId,
          optionId: optionId,
        };
      } else {
        payload = {
          activeTestId: activeTestId,
          mainTestId: mainTestId,
          optionId: optionId,
          test_type: test_type_secondary,
        };
      }

      const response = await api.post(url, payload);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      loading.is_selected = false;
    }
  };
  const finishTest = async (role, test_type, activeTestId) => {
    try {
      loading.is_finished = true;
      const apiPath = userRoleApiPath[role];
      const url = `${apiPath}/finish-test/${test_type}/${activeTestId}`;
      const response = await api.post(url);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      loading.is_finished = false;
    }
  };

  // results
  const getResults = async (role, params) => {
    try {
      const apiPath = userRoleApiPath[role];
      const url = `${apiPath}/attempts`;
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const getResultById = async (role, id) => {
    try {
      const apiPath = userRoleApiPath[role];
      const url = `${apiPath}/attempts/${id}`;
      const response = await api.get(url);
      const testData = response.data?.data;

      let results = [];

      const points = {
        teacher_intern: 2.5,
        attestation: 2.0,
        school: 1.0,
        national_certificate: 2.0,
      };

      if (testData?.test_type_id?.test_type === "dtm") {
        if (testData?.main_test?.length > 0) {
          const questions = testData.main_test;
          results.push({
            science: {
              name_uz: "Ona tili (majburiy)",
            },
            test_type: "main",
            questions: questions.slice(0, 10),
            ball: 1.1,
          });
          results.push({
            science: {
              name_uz: "Matematika (majburiy)",
            },
            test_type: "main",
            questions: questions.slice(10, 20),
            ball: 1.1,
          });
          results.push({
            science: {
              name_uz: "O'zbekiston tarixi (majburiy)",
            },
            test_type: "main",
            questions: questions.slice(20, 30),
            ball: 1.1,
          });
        }
        if (testData?.secondary_test?.length > 0) {
          results.push({
            science: testData?.subject,
            test_type: "secondary",
            questions: testData.secondary_test,
            ball: 3.1,
          });
        }
        if (testData?.third_test?.length > 0) {
          results.push({
            science: testData?.subject_2,
            test_type: "third",
            questions: testData.third_test,
            ball: 2.1,
          });
        }
      } else {
        if (testData?.main_test?.length > 0) {
          results.push({
            science: testData?.subject,
            test_type: "main",
            questions: testData?.main_test,
            ball: points[testData?.test_type_id?.test_type],
          });
        }
        if (testData?.secondary_test?.length > 0) {
          results.push({
            science: testData?.subject_2,
            test_type: "secondary",
            questions: testData.secondary_test,
            ball: points[testData?.test_type_id?.test_type],
          });
        }
      }
      result.value = {
        _id: testData._id,
        comments: testData?.comments || {},
        test_type: testData?.test_type_id?.test_type,
        test_type_id: testData?.test_type_id?._id,
        test_type_title: testData?.test_type_id?.title_uz,
        duration: testData?.test_type_id?.duration,
        questions_count: results.reduce((count, blog) => count + blog.questions.length, 0),
        correct_answers: testData?.correct_answers,
        wrong_answers: testData?.wrong_answers,
        teacher: testData?.teacher,
        results: results,
        startedAt: testData?.startedAt,
        endedAt: testData?.endedAt,
        status: testData?.status,
        createdAt: testData?.createdAt,
        updatedAt: testData?.updatedAt,
        timeoutId: testData?.timeoutId,
        score: testData?.score,
      };
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const selectedAnswersCount = computed(() => {
    return (
      tests.value.blogs?.reduce((count, blog) => {
        const selectedCount = blog.questions.reduce((innerCount, question) => {
          const questionSelectedCount = question.options.filter((option) => option.is_selected).length;
          return innerCount + questionSelectedCount;
        }, 0);
        return count + selectedCount;
      }, 0) || 0
    );
  });
  const unselectedAnswersCount = computed(() => {
    return totalQuestionsCount.value - selectedAnswersCount.value;
  });
  const totalQuestionsCount = computed(() => {
    return tests.value.questions_count || 0;
  });

  // reposts
  const getScienceReportResults = async (role, params) => {
    try {
      const apiPath = userRoleApiPath[role];
      const url = `${apiPath}/results`;
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const getPartsReportResults = async (role, science_id) => {
    try {
      const apiPath = userRoleApiPath[role];
      const url = `${apiPath}/results/${science_id}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const getSubjectsReportResults = async (role, science_id, subject_id) => {
    try {
      const apiPath = userRoleApiPath[role];
      const url = `${apiPath}/results/${science_id}/${subject_id}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // ball

  return {
    getTestSchoolSubject,
    getTime,
    getTestTypes,
    getTestTypeSubject,
    startTest,
    getActiveTest,
    selectedQuestion,
    finishTest,
    getResults,
    getResultById,
    getScienceReportResults,
    getPartsReportResults,
    getSubjectsReportResults,
    tests,
    result,
    totalQuestionsCount,
    selectedAnswersCount,
    unselectedAnswersCount,
    testTimer,
    times,
    loading,
  };
});
