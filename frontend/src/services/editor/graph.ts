import Editor from 'src/services/editor/index';
import { api } from 'boot/axios';
import { reactive } from 'vue';

const RESOURCE = 'algorithms/graph';

class Graph {
  editor: Editor;

  data = reactive({
    graph: {
      id: 0,
      algorithm_id: 0,
      updated_at: '',
    },
    loading: false,
    saving: false,
    saved: false,
  });

  constructor(editor: Editor) {
    this.editor = editor;
  }

  private async getGraph(graphId: number | string) {
    try {
      const { data: graph }: { data: {
          id: number,
          algorithm_id: number,
          graph: string,
          updated_at: string,
      } } = await api.get(`${RESOURCE}/${graphId}`);

      this.data.graph.id = graph.id;
      this.data.graph.algorithm_id = graph.algorithm_id;
      this.data.graph.updated_at = graph.updated_at;

      return Promise.resolve(graph.graph);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async open(graphId: number | string) {
    try {
      this.data.loading = true;

      const graph = await this.getGraph(graphId);

      if (graph) {
        const graphJson = JSON.parse(graph);

        if (graphJson) {
          this.editor.data.graph.fromJSON(JSON.parse(graph));

          const allElements = this.editor.data.graph.getElements();

          this.editor.element.createElementsTools(allElements);
        }
      }
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

      await api.put(`${RESOURCE}/${this.data.graph.id}`, {
        id: this.data.graph.id,
        graph: JSON.stringify(this.editor.data.graph),
      });

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
