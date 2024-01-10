import { reactive } from 'vue';
import { api } from 'boot/axios';
import date from 'src/services/date';

export interface IFlowchartCategory {
  id: number,
  name: string,
}

export interface IAlgorithm {
  id: number,
  title: string,
  description: string,
  author: string,
  version: string,
  categories?: IFlowchartCategory[],
  updated_at: string,
}

const emptyFlowchart = {
  id: 0,
  title: '',
  description: '',
  author: '',
  version: '',
  updated_at: '',
  categories: [],
};

export interface INode {
  id: number,
  algorithm_id: number,
  node_id: string,
  node_type: string,
  label: string,
}

export interface IAlgorithmThoroughSearchResultItem {
  id: number,
  title: string,
  description: string,
  nodes: INode[],
}

export interface IAlgorithmThoroughSearchResult {
  [key: number]: IAlgorithmThoroughSearchResultItem
}

const resource = 'algorithms';

class Algorithms {
  public data: {
    loading: boolean,
    showEditDialog: boolean,
    algorithms: IAlgorithm[],
    algorithm: IAlgorithm,
    algorithm_categories: { id: number, name: string }[],
    searchKeyword: string,
    searchResults: IAlgorithm[] | null,
    totalSearchResult: number | null,
  } = reactive({
      loading: false,
      showEditDialog: false,
      algorithms: [],
      algorithm: { ...emptyFlowchart },
      algorithm_categories: [],
      searchKeyword: '',
      searchResults: null,
      totalSearchResult: null,
    });

  get flowchartsList() {
    if (this.data.totalSearchResult !== null) return this.data.searchResults;

    return this.data.algorithms;
  }

  public async getAll() {
    try {
      this.data.loading = true;

      const { data: flowcharts }: { data: IAlgorithm[] } = await api.get(resource);

      if (flowcharts) {
        this.data.algorithms = [...flowcharts];
      }

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setTimeout(() => {
        this.data.loading = false;
      }, 1000);
    }
  }

  public async getAlgorithmCategories(algorithmId?: number) {
    try {
      const { data: categories }: {
        data: { id: number, name: string }[],
      } = await api.get(`${resource}/algorithm-categories/${algorithmId || this.data.algorithm.id}`);

      if (categories) {
        this.data.algorithm_categories = [...categories];
      }

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public setAlgorithmCategories() {
    this.data.algorithm.categories = [...this.data.algorithm_categories];
  }

  public async thorough_search(keyword: string) {
    try {
      this.data.loading = true;

      const { data: results }: {
        data: IAlgorithmThoroughSearchResult[],
      } = await api.get(`${resource}/thorough-search?keyword=${keyword}`);

      return Promise.resolve(results);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setTimeout(() => {
        this.data.loading = false;
      }, 1000);
    }
  }

  public async search(keyword: string) {
    try {
      this.data.loading = true;
      this.data.searchKeyword = keyword;

      this.data.searchResults = [];
      this.data.totalSearchResult = 0;

      const { data: flowchartsFound }: { data: IAlgorithm[] } = await api.get(`${resource}/search?keyword=${keyword}`);

      if (flowchartsFound && flowchartsFound.length) {
        this.data.searchResults = [...flowchartsFound];

        this.data.totalSearchResult = flowchartsFound.length;
      }

      // this.data.totalSearchResult = 0;

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setTimeout(() => {
        this.data.loading = false;
      }, 1000);
    }
  }

  public startCreating() {
    this.data.algorithm = { ...emptyFlowchart };

    this.toggleEditDialog();
  }

  public viewFlowchartData(flowchart: IAlgorithm) {
    this.data.algorithm = { ...flowchart };

    // convert to brazilian date (DD/MM/YYYY)
    this.data.algorithm.updated_at = date.toBR(flowchart.updated_at);

    this.toggleEditDialog();
  }

  public async update() {
    try {
      this.data.loading = true;

      const finalResource = `${resource}/${this.data.algorithm.id}`;

      await api.put(finalResource, {
        ...this.data.algorithm,
        categories: this.data.algorithm.categories?.length
          ? this.data.algorithm.categories.map((category) => category.id) : [],
      });

      this.toggleEditDialog();

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async save() {
    try {
      this.data.loading = true;

      await api.post(resource, {
        ...this.data.algorithm,
        categories: this.data.algorithm.categories?.length
          ? this.data.algorithm.categories.map((category) => category.id) : [],
      });

      this.toggleEditDialog();

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async delete() {
    try {
      await api.delete(`${resource}/${this.data.algorithm.id}`);

      await this.getAll();

      this.toggleEditDialog();

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public clearSearch() {
    this.data.searchResults = null;
    this.data.totalSearchResult = null;
    this.data.searchKeyword = '';
  }

  public async toggleEditDialog() {
    this.data.showEditDialog = !this.data.showEditDialog;

    if (this.data.showEditDialog && this.data.algorithm.id) {
      await this.getAlgorithmCategories();
    }
  }
}

export default Algorithms;
