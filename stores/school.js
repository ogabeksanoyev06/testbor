import { useApi } from "@/composables/useApi";
import { defineStore } from "pinia";

export const useSchoolStore = defineStore("school", () => {
  const api = useApi();
  const loading = ref(false);

  const getTestTypes = async () => {
    try {
      loading.value = true;
      const response = await api.get("superadmin/tests/types");
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    getTestTypes,
  };
});
