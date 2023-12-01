import * as joint from 'jointjs';
import { dia } from 'jointjs';

import { IJointData } from 'src/services/editor/types';
import { reactive } from 'vue';
import customElements, { CustomElement } from 'src/services/editor/elements/custom-elements';
import Element from 'src/services/editor/element';
import Graph from 'src/services/editor/graph';
import Metadata from 'src/services/editor/metadata';

const graph = new joint.dia.Graph({}, { cellNamespace: customElements });

export const deselectAllTexts = () => {
  window.getSelection()?.removeAllRanges();
};

class Editor {
  paperDiv: HTMLElement | undefined;

  graph: Graph;

  element: Element;

  metadata: Metadata;

  data: IJointData = reactive({
    readOnly: false,
    showSaveDialog: false,
    paper: undefined,
    graph,
  });

  constructor() {
    this.element = new Element(this);
    this.graph = new Graph(this);
    this.metadata = new Metadata(this);
  }

  public reset() {
    this.data.graph.clear();
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

          // ALERT!!!
          // to use editable link, just comment the line below
          defaultLink: () => Editor.createLink(),

          linkPinning: false,
          snapLinks: { radius: 10 },

          interactive: () => !this.data.readOnly,
        });

        this.data.paper.on('blank:pointerup', (/* elementView */) => {
          this.element.deselectAll();
        });

        this.data.paper.on('blank:pointerdown cell:pointerdown', () => {
          if (document.activeElement && document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();

            deselectAllTexts();
          }
        });

        // this.data.paper.on('cell:pointerdown', (cellView, evt) => {
        //   cellView.preventDefaultInteraction(evt);
        // });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.data.graph.on('change:position', (/* cell: dia.Cell */) => {
          this.graph.notSaved();

          deselectAllTexts();
        });

        this.data.paper.on('element:pointerdown', (/* elementView: dia.ElementView */) => {
          this.element.deselectAll();
        });

        this.data.paper.on('element:pointerup', (elementView: dia.ElementView) => {
          // do not select lane element if it's in read only mode
          if (!(this.data.readOnly && elementView.options.model.prop('type') === CustomElement.LANE)) {
            this.element.select(elementView.options.model.id);
          }
        });

        this.data.paper.on('link:snap:connect', () => {
          this.element.deselectAll();

          deselectAllTexts();
        });

        this.data.paper.on('link:connect', () => {
          this.element.deselectAll();

          this.graph.notSaved();
        });

        this.data.paper.on('link:disconnect', () => {
          this.element.deselectAll();

          this.graph.notSaved();
        });

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  private static createLink() {
    return new customElements.LinkElement();
  }

  public toggleSaveDialog() {
    this.data.showSaveDialog = !this.data.showSaveDialog;
  }

  public setReadOnly(value: boolean) {
    this.data.readOnly = value;
  }
}

export default Editor;
