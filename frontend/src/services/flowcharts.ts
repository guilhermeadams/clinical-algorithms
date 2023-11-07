import { reactive } from 'vue';
import { api } from 'boot/axios';

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
}

const emptyFlowchart = {
  id: 0,
  title: '',
  description: '',
  author: '',
  categories: [],
  version: '',
};

class Flowcharts {
  public data: {
    loading: boolean,
    showEditDialog: boolean,
    flowcharts: IFlowchart[],
    flowchart: IFlowchart,
    searchResults: IFlowchart[] | null,
  } = reactive({
      loading: false,
      showEditDialog: false,
      flowcharts: [],
      flowchart: { ...emptyFlowchart },
      searchResults: null,
    });

  get flowchartsList() {
    return this.data.searchResults && this.data.searchResults.length
      ? this.data.searchResults : this.data.flowcharts;
  }

  public async getAll() {
    try {
      this.data.loading = true;

      const { data: flowcharts }: { data: IFlowchart[] } = await api.get('algorithms');

      if (flowcharts && flowcharts.length) {
        this.data.flowcharts = [...flowcharts];
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

  public search(keyword: string) {
    try {
      this.data.loading = true;

      this.data.searchResults = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const flowchart of this.data.flowcharts) {
        if (flowchart.title.toLowerCase().includes(keyword.toLowerCase())) {
          this.data.searchResults.push(flowchart);
        }
      }

      return Promise.resolve(this.data.searchResults);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setTimeout(() => {
        this.data.loading = false;
      }, 1000);
    }
  }

  public startCreating() {
    this.data.flowchart = { ...emptyFlowchart };

    this.toggleEditDialog();
  }

  public editFlowchartData(flowchart: IFlowchart) {
    this.data.flowchart = { ...flowchart };

    this.toggleEditDialog();
  }

  public async save() {
    try {
      this.data.loading = true;

      const { data }: { data: { rowcount: number } } = await api.post('algorithms', {
        ...this.data.flowchart,
      });

      if (data.rowcount > 0) await this.getAll();

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      this.toggleEditDialog();
    }
  }

  public delete() {
    try {
      this.data.loading = true;

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      this.toggleEditDialog();

      setTimeout(() => {
        const updatedFlowcharts: IFlowchart[] = [];

        // eslint-disable-next-line no-restricted-syntax
        for (const flowchart of this.data.flowcharts) {
          if (flowchart.id !== this.data.flowchart.id) {
            updatedFlowcharts.push({ ...flowchart });
          }
        }

        this.data.flowcharts = [...updatedFlowcharts];

        this.data.loading = false;
      }, 1500);
    }
  }

  public clearSearch() {
    this.data.searchResults = null;
  }

  public toggleEditDialog() {
    this.data.showEditDialog = !this.data.showEditDialog;
  }
}

export default Flowcharts;
