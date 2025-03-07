import { useApi } from "@/composables/useApi";
import { defineStore } from "pinia";

export const useUniversitiesStore = defineStore("universities", () => {
  const api = useApi();
  const loading = ref(false);

  const getSearchUniversity = async (params) => {
    try {
      loading.value = true;
      const response = await api.get("pupils/universities", { params });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const getUniversitiesBySubjectsIds = async (params) => {
    try {
      loading.value = true;
      const response = await api.patch("pupils/universities", params);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const getAllFaculty = async (data) => {
    try {
      loading.value = true;
      const response = await api.patch("pupils/facutets", data);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return { getSearchUniversity, getAllFaculty, getUniversitiesBySubjectsIds };
});
