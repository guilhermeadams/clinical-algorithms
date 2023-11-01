import * as joint from 'jointjs';
import { dia } from 'jointjs';

import { IJointData } from 'src/services/editor/types';
import { reactive } from 'vue';
import customElements from 'src/services/editor/elements/custom-elements';
import Element from 'src/services/editor/element';

class Editor {
  paperDiv: HTMLElement | undefined;

  element: Element;

  data: IJointData = reactive({
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

  private static createLink() {
    return new customElements.Link();
  }
}

export default Editor;
