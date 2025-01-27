import { useApi } from "@/composables/useApi";
import { defineStore } from "pinia";

export const useSchoolStore = defineStore("school", () => {
  const api = useApi();
  const loading = ref(false);

  const getAllTestTypes = async () => {
    try {
      loading.value = true;
      const response = await api.get("schools/tests/types");
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const getSubjects = async (id) => {
    try {
      loading.value = true;
      const response = await api.get(`schools/subjects?filter[test_type]=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const getFilterPupilResults = async (params) => {
    try {
      loading.value = true;
      const response = await api.patch(`schools/teachers`, { params });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };
  const getFilterTeacherResults = async (params) => {
    try {
      loading.value = true;
      const response = await api.patch(`schools/teachers`, { params });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    getAllTestTypes,
    getSubjects,
    getFilterPupilResults,
    getFilterTeacherResults,
  };
});
