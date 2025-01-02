import {defineStore} from 'pinia';
import {ref} from 'vue';
import {useApi} from '@/composables/useApi';

export const useClassStore = defineStore('class', () => {
	const api = useApi();
	const loading = ref({
		create: false,
		delete: false,
		update: false,
		get: false
	});

	const createClass = async (data) => {
		loading.value.create = true;
		try {
			const response = await api.post('schools/class', data);
			return response.data;
		} catch (error) {
			throw error;
		} finally {
			loading.value.create = false;
		}
	};

	const getClasses = async () => {
		try {
			const response = await api.get('schools/class');
			return response.data;
		} catch (error) {
			throw error;
		}
	};

	const getClassById = async (id) => {
		loading.value.get = true;
		try {
			const response = await api.get(`schools/class/${id}`);
			return response.data;
		} catch (error) {
			throw error;
		} finally {
			loading.value.get = false;
		}
	};

	const deleteClass = async (id) => {
		loading.value.delete = true;
		try {
			const response = await api.delete(`schools/class/${id}`);
			return response.data;
		} catch (error) {
			throw error;
		} finally {
			loading.value.delete = false;
		}
	};

	const updateClass = async (id, data) => {
		loading.value.update = true;
		try {
			const response = await api.put(`schools/class/${id}`, data);
			return response.data;
		} catch (error) {
			throw error;
		} finally {
			loading.value.update = false;
		}
	};

	return {
		createClass,
		getClasses,
		getClassById,
		deleteClass,
		updateClass,
		loading
	};
});
