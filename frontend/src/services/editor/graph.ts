import Editor from 'src/services/editor/index';
import { api } from 'boot/axios';
import { reactive } from 'vue';
import { formatDatetime } from 'src/services/date';

const RESOURCE_ALGORITHM = 'algorithms';
const RESOURCE = 'algorithms/graph';

class Graph {
  editor: Editor;

  data = reactive({
    graph: {
      id: 0,
      algorithm_id: 0,
      updated_at: '',
    },
    algorithm: {
      id: 0,
      title: '',
      description: '',
      version: '',
      updated_at: '',
    },
    loading: false,
    saving: false,
    saved: false,
  });

  constructor(editor: Editor) {
    this.editor = editor;
  }

  public get lastUpdate() {
    return this.data.graph.updated_at;
  }

  private async setGraph(graphId: number | string) {
    try {
      const { data }: { data: {
          id: number,
          algorithm_id: number,
          graph: string,
          updated_at: string,
      } } = await api.get(`${RESOURCE}/${graphId}`);

      this.data.graph.id = data.id;
      this.data.graph.algorithm_id = data.algorithm_id;
      this.data.graph.updated_at = data.updated_at;

      if (data.graph) {
        const graphJson = JSON.parse(data.graph);

        if (graphJson) {
          this.editor.data.graph.fromJSON(JSON.parse(data.graph));

          const allElements = this.editor.data.graph.getElements();

          this.editor.element.createElementsTools(allElements);
        }
      }

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async setAlgorithm() {
    try {
      const { data } = await api.get(`${RESOURCE_ALGORITHM}/${this.data.graph.algorithm_id}`);

      this.data.algorithm = { ...data };

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async open(graphId: number | string) {
    try {
      this.data.loading = true;

      await this.setGraph(graphId);

      await this.setAlgorithm();
    } catch (error) {
      console.error(error);

      // TODO: $q. notify
    } finally {
      this.data.loading = false;
    }
  }

  public async save() {
    try {
      this.data.saving = true;

      const { data } = await api.put(`${RESOURCE}/${this.data.graph.id}`, {
        id: this.data.graph.id,
        graph: JSON.stringify(this.editor.data.graph),
        algorithm_id: this.data.graph.algorithm_id,
      });

      this.data.graph.updated_at = data.updated_at;

      this.data.saved = true;
    } catch (error) {
      console.error(error);

      // TODO: $q. notify
    } finally {
      this.data.saving = false;
    }
  }
}

export default Graph;
