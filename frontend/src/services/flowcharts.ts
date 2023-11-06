import { reactive } from 'vue';

export interface IFlowchartCategory {
  name: string,
}

export interface IFlowchart {
  id: number,
  title: string,
  summary: string,
  author: string,
  categories: IFlowchartCategory[],
  version: string,
}

const flowchartsMocked: IFlowchart[] = [
  {
    id: 1,
    title: 'Fluxograma #1',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'Gabriel Silveira',
    categories: [
      {
        name: 'Prevenção',
      },
      {
        name: 'Emergências',
      },
    ],
    version: '1.2',
  },
  {
    id: 2,
    title: 'Fluxograma #2',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'Roberto Rizzo',
    categories: [
      {
        name: 'Emergências',
      },
    ],
    version: '1.1',
  },
];

const emptyFlowchart = {
  id: 0,
  title: '',
  summary: '',
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

  constructor() {
    this.data.flowcharts = [...flowchartsMocked];
  }

  get flowchartsList() {
    return this.data.searchResults && this.data.searchResults.length
      ? this.data.searchResults : this.data.flowcharts;
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

  public save() {
    try {
      this.data.loading = true;

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      this.toggleEditDialog();

      setTimeout(() => {
        if (this.data.flowchart.id) {
          // update user
        } else {
          // insert user
          this.data.flowcharts.unshift({
            ...this.data.flowchart,
            id: 999,
          });
        }

        this.data.loading = false;
      }, 1500);
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
