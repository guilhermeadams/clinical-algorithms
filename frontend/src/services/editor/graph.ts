import Editor from 'src/services/editor/index';
import { api } from 'boot/axios';
import { reactive, ref } from 'vue';

const RESOURCE = 'algorithms/graph';

class Graph {
  editor: Editor;

  data = reactive({
    graphId: 0,
    loading: false,
    saving: false,
    saved: true,
  });

  constructor(editor: Editor) {
    this.editor = editor;
  }

  static async getGraph(graphId: number | string) {
    try {
      const { data }: { data: {
        id: number,
        graph: string,
      } } = await api.get(`${RESOURCE}/${graphId}`);

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async open(graphId: number | string) {
    try {
      this.data.loading = true;

      const graph = await Graph.getGraph(graphId);

      this.data.graphId = graph.id;

      if (graph.graph) {
        const graphJson = JSON.parse(graph.graph);

        if (graphJson) {
          this.editor.data.graph.fromJSON(JSON.parse(graph.graph));

          const allElements = this.editor.data.graph.getElements();

          this.editor.element.createElementsTools(allElements);
        }
      }
      //
      // if (this.graph) {
      //   console.log('Graph #graphId');
      //   console.log(graph);
      // } else {
      //   console.log('There is no graph yet');
      // }
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

      await api.put(`${RESOURCE}/${this.data.graphId}`, {
        id: this.data.graphId,
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
