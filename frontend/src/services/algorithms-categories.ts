import { reactive } from 'vue';
import { api } from 'boot/axios';

class AlgorithmsCategories {
  public data: {
    loading: boolean,
    categories: { id: number, name: string }[],
    category: { id: number, name: string },
    showEditDialog: boolean,
  } = reactive({
      loading: false,
      categories: [],
      category: { id: 0, name: '' },
      showEditDialog: false,
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

  public toggleEditDialog() {
    this.data.showEditDialog = !this.data.showEditDialog;
  }

  public async update() {
    try {
      const finalResource = `algorithms/categories/${this.data.category.id}`;

      await api.put(finalResource, {
        ...this.data.category,
      });

      this.toggleEditDialog();

      await this.get();

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default AlgorithmsCategories;
