import * as joint from 'jointjs';
import { dia } from 'jointjs';

import Editor, { deselectAllTexts } from 'src/services/editor/index';

import customElements, {
  CustomElement,
  elementName,
  PORT,
  TEXTAREA_CLASSNAME,
} from 'src/services/editor/elements/custom-elements';

import { reactive } from 'vue';

import { autoResizeTextarea } from 'src/services/editor/textarea';

export interface IElementToolsPadding {
  left: number | 20,
  top: number | 12,
  right: number | 10,
  bottom: number | 16,
}

export interface IElementToolsSettings {
  element: dia.Element,
  options?: {
    position?: {
      x: number,
      y: number,
    },
    padding?: IElementToolsPadding,
  }
}

class Element {
  editor: Editor;

  data: {
    selectedId: dia.Cell.ID,
    elementToCreate: string,
    creationPosition: {
      x: number,
      y: number,
    },
  } = reactive({
      selectedId: '',
      elementToCreate: '',
      creationPosition: {
        x: 0,
        y: 0,
      },
    });

  constructor(editor: Editor) {
    this.editor = editor;
  }

  public isAction(element?: dia.Element) {
    if (element) return element.prop('type') === CustomElement.ACTION;

    return this.getSelected()?.prop('type') === CustomElement.ACTION;
  }

  public isEvaluation(element?: dia.Element) {
    if (element) return element.prop('type') === CustomElement.EVALUATION;

    return this.getSelected()?.prop('type') === CustomElement.EVALUATION;
  }

  public isLane(element?: dia.Element) {
    if (element) return element.prop('type') === CustomElement.LANE;

    return this.getSelected()?.prop('type') === CustomElement.LANE;
  }

  public setCreationPosition(x: number, y: number) {
    this.data.creationPosition = { x, y };
  }

  private removeSelected() {
    this.getSelected()?.remove();

    this.deselectAll();

    this.editor.graph.notSaved();
  }

  private customRemoveButton(x = 0, y = 0) {
    return new joint.elementTools.Button({
      focusOpacity: 0.5,
      // x,
      // y,
      offset: {
        x,
        y,
      },
      action: () => {
        this.removeSelected();
      },
      markup: [{
        tagName: 'circle',
        selector: 'button',
        attributes: {
          r: 10,
          fill: 'white',
          cursor: 'pointer',
        },
      }, {
        tagName: 'path',
        selector: 'icon',
        attributes: {
          d: 'M 2.59 -4 L 0 -1.41 L -2.59 -4 L -4 -2.59 L -1 0 L -4 2.59 L -2.59 4 L 0 1.41 L 2.59 4 L 4 2.59 L 1.41 0 L 4 -2.59 L 2.59 -4 z M 0 -10 C -5.53 -10 -10 -5.53 -10 0 s 4.47 10 10 10 s 10 -4.47 10 -10 S 5.53 -10 0 -10 z m 0 18 c -4.41 0 -8 -3.59 -8 -8 s 3.59 -8 8 -8 s 8 3.59 8 8 s -3.59 8 -8 8 z',
          fill: 'red',
          cursor: 'pointer',
        },
      }],
    });
  }

  public createElementsTools(elements: dia.Element[]) {
    elements.forEach((element) => {
      if (element.prop('type') === CustomElement.LANE) {
        this.createTools(element, {
          removeButtons: {
            x: 20,
            y: 17,
          },
        });
      } else {
        this.createTools(element);
      }
    });
  }

  private createTools(element: dia.Element, params?: { removeButtons: { x: number, y: number } }) {
    const boundaryTool = new joint.elementTools.Boundary({
      padding: 10,
      rotate: true,
      useModelGeometry: true,
    });

    const allTools = [boundaryTool];

    if (!this.editor.data.readOnly) {
      const removeButton = this.customRemoveButton(
        params?.removeButtons.x,
        params?.removeButtons.y,
      );

      allTools.push(removeButton);
    }

    const toolsView = new joint.dia.ToolsView({
      tools: [...allTools],
    });

    if (this.editor.data.paper instanceof dia.Paper) {
      const elementView = element.findView(this.editor.data.paper);

      elementView.addTools(toolsView);

      elementView.hideTools();
    }
  }

  public async createElement(event: DragEvent) {
    // prevent default action (open as link for some elements)
    event.preventDefault();

    switch (this.data.elementToCreate) {
      case CustomElement.START:
        this.setCreationPosition(event.x - 24, event.y - 135);
        await this.create.Start();
        break;
      case CustomElement.ACTION:
        this.setCreationPosition(event.x - 100, event.y - 150);
        await this.create.Action();
        break;
      case CustomElement.EVALUATION:
        this.setCreationPosition(event.x - 100, event.y - 150);
        await this.create.Evaluation();
        break;
      case CustomElement.END:
        this.setCreationPosition(event.x - 24, event.y - 135);
        await this.create.End();
        break;
      case CustomElement.LANE:
        this.setCreationPosition(event.x - 24, event.y - 135);
        await this.create.Lane();
        break;
      default:
        await this.create.Start();
    }

    this.editor.graph.notSaved();
  }

  get create() {
    return {
      Start: async () => {
        const element = new customElements.StartElement({
          position: {
            x: this.data.creationPosition.x,
            y: this.data.creationPosition.y,
          },
          ports: Element.generatePorts(19, 27),
        }).resize(50, 50).addTo(this.editor.data.graph);

        this.createTools(element);

        deselectAllTexts();
      },
      Action: async () => {
        const element = new customElements.ActionElement({
          position: {
            x: this.data.creationPosition.x,
            y: this.data.creationPosition.y,
          },
          ports: Element.generatePorts(95, 42),
        }).resize(200, 84).addTo(this.editor.data.graph);

        this.createTools(element);

        this.input.createEventHandlers();

        deselectAllTexts();
      },
      Recommendation: async () => {
        new customElements.RecommendationElement({
          position: {
            x: 300,
            y: 300,
          },
        }).resize(500, 100).addTo(this.editor.data.graph);
      },
      Evaluation: async () => {
        const element = new customElements.EvaluationElement({
          position: {
            x: this.data.creationPosition.x,
            y: this.data.creationPosition.y,
          },
          ports: Element.generatePorts(95, 50),
        }).resize(200, 100).addTo(this.editor.data.graph);

        this.createTools(element);

        this.input.createEventHandlers();

        deselectAllTexts();
      },
      End: async () => {
        const element = new customElements.EndElement({
          position: {
            x: this.data.creationPosition.x,
            y: this.data.creationPosition.y,
          },
        }).addTo(this.editor.data.graph);

        this.createTools(element);

        deselectAllTexts();
      },
      Lane: async () => {
        const element = new customElements.LaneElement({
          position: {
            x: 0,
            y: this.data.creationPosition.y,
          },
        }).resize(3000, 50).addTo(this.editor.data.graph);

        this.createTools(element, {
          removeButtons: {
            x: 20,
            y: 17,
          },
        });

        this.input.createEventHandlers();

        deselectAllTexts();
      },
    };
  }

  public deselectAll() {
    const elements = this.editor.data.graph.getElements();

    // remove stroke from the selected element
    elements.forEach((element) => {
      // hide element tools
      if (this.editor.data.paper) {
        element.findView(this.editor.data.paper).hideTools();
      }
    });

    this.editor.element.data.selectedId = '';
  }

  public async setProp(
    propName: string,
    value: boolean | string | number | object | undefined | null,
  ) {
    this.getSelected()?.prop(`props/${propName}`, value);

    // avoid "setNotSavedChanges" without changing anything
    // if (commitChanges) {
    //   await this.joint.setNotSavedChanges(true);
    // }
  }

  public async setAttr(attrName: string, value: string) {
    this.getSelected()?.attr(attrName, value);

    // await this.joint.setNotSavedChanges(true);
  }

  public getById(id: dia.Cell.ID): dia.Element | undefined {
    return this.editor.data.graph.getElements().find((element) => element.id === id);
  }

  public select(elementId: dia.Cell.ID) {
    this.deselectAll();

    const element = this.getById(elementId);

    if (element && this.editor.data.paper) {
      const elementView = element.findView(this.editor.data.paper);

      if (elementView) {
        elementView.showTools();

        this.data.selectedId = elementId;

        console.log('Selected element props:');
        console.log(element.prop('props'));

        const selectedElement = this.getSelected();

        if (selectedElement && selectedElement.prop('type') === CustomElement.LANE) {
          const { y } = selectedElement.position();

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          selectedElement.position(0, y);

          if (document.activeElement?.tagName !== 'INPUT') {
            deselectAllTexts();
          }
        }
      }
    }
  }

  public getSelected() {
    const elements = this.editor.data.graph.getElements();

    return elements.find(({ id }) => this.data.selectedId === id);
  }

  public getLabel() {
    return this.getSelected()?.prop('props/label') || '';
  }

  public getTitle() {
    return this.getSelected()?.prop('title') || '';
  }

  public async setTitle(title: string) {
    await this.setProp('title', title);

    await this.setAttr('label/text', title);
  }

  private static generatePorts(x: number, y: number) {
    const newlyPort = { ...PORT };

    newlyPort.attrs.body.x = x;
    newlyPort.attrs.body.y = y;

    return {
      items: [newlyPort],
    };
  }

  public getName() {
    const elementType = this.getSelected()?.prop('type');

    if (elementType) return elementName[elementType];

    return '';
  }

  get input() {
    return {
      getFromEditorElement(elementId: dia.Cell.ID) {
        const domElement = document.querySelector(`[model-id="${elementId}"]`);

        return domElement?.getElementsByTagName('textarea')[0];
      },
      value: () => {
        const selectedElement = this.getSelected();

        if (selectedElement) {
          // this.textarea.
        }
      },
      setValues: (elements: dia.Element[]) => {
        elements.forEach((element) => {
          if (
            this.isAction(element)
            || this.isEvaluation(element)
            || this.isLane(element)
          ) {
            const textarea = this.input.getFromEditorElement(element.id);

            if (textarea) {
              textarea.value = element.prop('props/label') || '';
            }
          }

          setTimeout(() => {
            deselectAllTexts();
          }, 1);
        });
      },
      getEditorElement: (input: HTMLElement) => {
        const father = input.parentElement;
        const grandfather = father?.parentElement;
        const grandGrandfather = grandfather?.parentElement;
        const element = grandGrandfather?.parentElement;

        if (element) {
          const elementId = element?.getAttribute('model-id');

          if (elementId) return this.getById(elementId);
        }

        return undefined;
      },
      createEventHandlers: () => {
        const inputs = document.getElementsByClassName(TEXTAREA_CLASSNAME);

        if (inputs.length) {
          // eslint-disable-next-line no-restricted-syntax
          for (const input of inputs) {
            if (input instanceof HTMLTextAreaElement) {
              autoResizeTextarea(input);
            }

            input.addEventListener('input', (event) => {
              const element = this.input.getEditorElement(event.target as HTMLElement);

              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              element?.prop('props/label', event.target?.value);

              this.editor.graph.notSaved();
            });
          }
        }
      },
      disableAll() {
        const inputs = document.getElementsByClassName(TEXTAREA_CLASSNAME);

        if (inputs.length) {
          // eslint-disable-next-line no-restricted-syntax
          for (const input of inputs) {
            input.setAttribute('readonly', 'true');
            input.classList.add('cursor-inherit');
          }
        }
      },
    };
  }
}

export default Element;
