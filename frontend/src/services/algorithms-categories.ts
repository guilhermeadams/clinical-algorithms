import { reactive } from 'vue';
import { api } from 'boot/axios';

class AlgorithmsCategories {
  public data: {
    loading: boolean,
    categories: { id: number, name: string }[],
  } = reactive({
      loading: false,
      categories: [],
    });

  public async get() {
    try {
      this.data.loading = false;

      const { data }: { data: { id: number, name: string }[] } = await api.get('algorithms/categories');

      this.data.categories = [...data];

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      this.data.loading = false;
    }
  }
}

export default AlgorithmsCategories;
