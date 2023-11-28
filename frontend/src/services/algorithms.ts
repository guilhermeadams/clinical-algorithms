import { reactive } from 'vue';
import { api } from 'boot/axios';
import date from 'src/services/date';

export interface IFlowchartCategory {
  name: string,
}

export interface IFlowchart {
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

const resource = 'algorithms';

class Algorithms {
  public data: {
    loading: boolean,
    showEditDialog: boolean,
    algorithms: IFlowchart[],
    algorithm: IFlowchart,
    searchResults: IFlowchart[] | null,
    totalSearchResult: number | null,
  } = reactive({
      loading: false,
      showEditDialog: false,
      algorithms: [],
      algorithm: { ...emptyFlowchart },
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

      const { data: flowcharts }: { data: IFlowchart[] } = await api.get(resource);

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

  public async thorough_search(keyword: string) {
    try {
      this.data.loading = true;

      const { data: algorithmsFound }: { data: IFlowchart[] } = await api.get(`${resource}/thorough-search?keyword=${keyword}`);

      console.log(algorithmsFound);

      this.data.totalSearchResult = 0;

      return Promise.resolve(true);
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

      this.data.searchResults = [];

      const { data: flowchartsFound }: { data: IFlowchart[] } = await api.get(`${resource}/search?keyword=${keyword}`);

      if (flowchartsFound && flowchartsFound.length) {
        this.data.searchResults = [...flowchartsFound];

        this.data.totalSearchResult = flowchartsFound.length;
      }

      this.data.totalSearchResult = 0;

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

  public viewFlowchartData(flowchart: IFlowchart) {
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
      });

      await this.getAll();

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
      });

      await this.getAll();

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
  }

  public toggleEditDialog() {
    this.data.showEditDialog = !this.data.showEditDialog;
  }
}

export default Algorithms;
