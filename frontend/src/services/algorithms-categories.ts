import { reactive } from 'vue';
import { api } from 'boot/axios';

const blankCategory = {
  id: 0,
  name: '',
};

class AlgorithmsCategories {
  public data: {
    loading: boolean,
    categories: { id: number, name: string }[],
    category: { id: number, name: string },
    showEditDialog: boolean,
  } = reactive({
      loading: false,
      categories: [],
      category: { ...blankCategory },
      showEditDialog: false,
    });

  public clearCategoryData() {
    this.data.category = { ...blankCategory };
  }

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

  public async delete() {
    try {
      await api.delete(`algorithms/categories/${this.data.category.id}`);

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public toggleEditDialog(clearCategoryData = false) {
    if (clearCategoryData) {
      this.clearCategoryData();
    }

    this.data.showEditDialog = !this.data.showEditDialog;
  }

  public async save() {
    try {
      await api.post('algorithms/categories', {
        ...this.data.category,
      });

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async update() {
    try {
      const finalResource = `algorithms/categories/${this.data.category.id}`;

      await api.put(finalResource, {
        ...this.data.category,
      });

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default AlgorithmsCategories;
