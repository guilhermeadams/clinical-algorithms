import * as joint from 'jointjs';
import { dia } from 'jointjs';

import { IJointData } from 'src/services/editor/types';
import { reactive } from 'vue';
import customElements from 'src/services/editor/elements/custom-elements';
import Element from 'src/services/editor/element';
import { api } from 'boot/axios';

class Editor {
  paperDiv: HTMLElement | undefined;

  element: Element;

  data: IJointData = reactive({
    loadingGraph: false,
    paper: undefined,
    graph: new joint.dia.Graph({}, { cellNamespace: customElements }),
    options: {},
  });

  constructor() {
    this.element = new Element(this);
  }

  public async init(elementId: string) {
    await this.setPaper(elementId);
  }

  private async setPaper(elementId: string) {
    return new Promise((resolve, reject) => {
      try {
        this.paperDiv = document.getElementById(elementId) || undefined;

        this.data.paper = new joint.dia.Paper({
          el: this.paperDiv,
          model: this.data.graph,
          width: 3000,
          height: 3000,

          cellViewNamespace: customElements,
          preventDefaultViewAction: false,

          drawGrid: false,
          gridSize: 1,
          background: {
            color: '#EAEAEA',
          },

          defaultLink: () => Editor.createLink(),
          linkPinning: false,
          snapLinks: { radius: 10 },

        });

        this.data.paper.on('blank:pointerup', (/* elementView */) => {
          this.element.deselectAll();
        });

        this.data.paper.on('blank:pointerdown cell:pointerdown', () => {
          if (document.activeElement && document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        });

        // this.data.paper.on('cell:pointerdown', (cellView, evt) => {
        //   cellView.preventDefaultInteraction(evt);
        // });

        this.data.paper.on('element:pointerup', (elementView: dia.ElementView) => {
          this.element.deselectAll();

          elementView.showTools();

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.element.data.selectedId = elementView.model.id;

          console.log('SELECTED ELEMENT:');
          console.log(this.element.getSelected());
        });

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async getGraph(graphId: number) {
    try {
      const { data }: { data: { graph: string } } = await api.get(`algorithms/graph/${graphId}`);

      return Promise.resolve(data.graph);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async openGraph(graphId: number) {
    try {
      this.data.loadingGraph = true;

      const graph = await Editor.getGraph(graphId);

      if (graph) {
        console.log('Graph #graphId');
        console.log(graph);
      } else {
        console.log('There is no graph yet');
      }
    } catch (error) {
      console.error(error);

      // TODO: $q. notify
    } finally {
      this.data.loadingGraph = false;
    }
  }

  private static createLink() {
    return new customElements.Link();
  }
}

export default Editor;
