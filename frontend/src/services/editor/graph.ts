import Editor from 'src/services/editor/index';
import { api } from 'boot/axios';
import { reactive } from 'vue';

const RESOURCE_ALGORITHM = 'algorithms';
const RESOURCE = 'algorithms/graph';

export interface IEditorData {
  graph: {
    id: number,
    algorithm_id: number,
    updated_at: string,
  },
  algorithm: {
    id: number,
    title: string,
    description: string,
    version: string,
    updated_at: string,
  },
  loading: boolean,
  saving: boolean,
  saved: boolean | null,
}

class Graph {
  editor: Editor;

  data: IEditorData = reactive({
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
    saved: null,
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
        // open graph...
        const graphJson = JSON.parse(data.graph);

        if (graphJson) {
          this.editor.data.graph.fromJSON(JSON.parse(data.graph));

          const allElements = this.editor.data.graph.getElements();

          this.editor.element.createElementsTools(allElements);

          this.editor.element.setTextareaValues(allElements);

          this.editor.element.textarea.createEventHandlers();
        }
      } else {
        // TODO: create empty graph...
        // this.editor.data.graph = new joint.dia.Graph({}, { cellNamespace: customElements });
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

  public notSaved() {
    this.data.saved = false;
  }

  public saved() {
    this.data.saved = true;
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

      this.saved();
    } catch (error) {
      console.error(error);

      // TODO: $q. notify
    } finally {
      setTimeout(() => {
        this.data.saving = false;
      }, 1000);
    }
  }
}

export default Graph;
