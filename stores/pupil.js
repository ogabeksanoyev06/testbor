import {defineStore} from 'pinia';
import {useApi} from '@/composables/useApi';

export const usePupilStore = defineStore('pupil', () => {
	const api = useApi();

	const loading = ref({
		create: false,
		delete: false,
		update: false,
		get: false
	});

	const createPupil = async (data) => {
		try {
			loading.value.create = true;
			const response = await api.post('schools/pupil', data);
			return response.data;
		} catch (error) {
			throw error;
		} finally {
			loading.value.create = false;
		}
	};

	const getPupils = async () => {
		try {
			const response = await api.get('schools/pupil');
			return response.data;
		} catch (error) {
			throw error;
		}
	};

	const getPupilsClassById = async (id) => {
		try {
			const response = await api.get(`schools/pupils/${id}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	};

	const getPupilById = async (id) => {
		try {
			loading.value.get = true;
			const response = await api.get(`schools/pupil/${id}`);
			return response.data;
		} catch (error) {
			throw error;
		} finally {
			loading.value.get = false;
		}
	};

	const deletePupil = async (id) => {
		try {
			loading.value.delete = true;
			const response = await api.delete(`schools/pupil/${id}`);
			return response.data;
		} catch (error) {
			throw error;
		} finally {
			loading.value.delete = false;
		}
	};

	const updatePupil = async (id, data) => {
		try {
			loading.value.update = true;
			const response = await api.put(`schools/pupil/${id}`, data);
			return response.data;
		} catch (error) {
			throw error;
		} finally {
			loading.value.update = false;
		}
	};

	return {
		createPupil,
		getPupils,
		getPupilById,
		getPupilsClassById,
		deletePupil,
		updatePupil,
		loading
	};
});
