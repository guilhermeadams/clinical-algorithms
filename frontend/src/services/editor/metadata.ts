import Editor from 'src/services/editor/index';
import { dia } from 'jointjs';
import { reactive } from 'vue';

export interface IFixedMetadata {
  description: string,
  recommendation_type: string,
  intervention_type: string,
  intervention: string,
  comparator: string,
  direction: string,
  strength: string,
  certainty_of_the_evidence: string,
  implementation_considerations: string,
  additional_comments: string,
  recommendation_source: string,
  links?: {
    url: string,
    type: string,
  }[],
}

class Metadata {
  editor: Editor;

  data: {
    mountingComponent: boolean,
    totalBlocks: number,
    totalLinks: { [key: number]: number },
    showPanel: boolean,
  } = reactive({
      mountingComponent: true,
      totalBlocks: 0,
      totalLinks: {},
      showPanel: false,
    });

  constructor(editor: Editor) {
    this.editor = editor;
  }

  public closeMetadataPanel() {
    this.data.showPanel = false;
  }

  public openMetadataPanel() {
    this.data.showPanel = true;
  }

  public resetTotalBlocks() {
    this.data.totalBlocks = 0;
  }

  public updateTotalBlocks() {
    const metadata = this.getFromElement();

    if (metadata && metadata.fixed) {
      this.data.totalBlocks = metadata.fixed.length;
    }
  }

  public getFromElement(element: dia.Element | undefined = undefined) {
    if (element) {
      const prop = element.prop('props/metadata') as {
        fixed: IFixedMetadata[]
      };

      return prop || undefined;
    }

    const selectedElement = this.editor.element.getSelected();

    if (selectedElement) {
      const prop = selectedElement.prop('props/metadata') as {
        fixed: IFixedMetadata[]
      };

      return prop || undefined;
    }

    return undefined;
  }

  public async removeFixed(index: number) {
    const selectedElement = this.editor.element.getSelected();

    if (selectedElement) {
      const metadata = this.getFromElement(selectedElement);

      if (
        metadata
        && metadata?.fixed
        && metadata?.fixed.length
      ) {
        // get fixed metadata
        const oldItems = [...metadata.fixed];

        // delete metadata before updating
        await this.editor.element.setProp('metadata', null);

        const updatedFixedMetadata: IFixedMetadata[] = [];

        for (let currentIndex = 0; currentIndex < oldItems.length; currentIndex += 1) {
          if (currentIndex !== (index - 1)) {
            updatedFixedMetadata.push(oldItems[currentIndex]);
          }
        }

        await this.editor.element.setProp('metadata', {
          fixed: updatedFixedMetadata,
          variable: [],
        });
      }
    }
  }

  public async setFixedMetadata(data: IFixedMetadata, index: number) {
    if (!this.data.mountingComponent) {
      const selectedElement = this.editor.element.getSelected();

      if (selectedElement) {
        const metadata = this.getFromElement(selectedElement);

        // already has fixed metadata
        if (
          metadata
          && metadata?.fixed
          && metadata?.fixed.length
        ) {
          // get fixed metadata
          const oldValues = [...metadata.fixed];

          // delete metadata before updating
          await this.editor.element.setProp('metadata', null);

          const updatedFixedMetadata: IFixedMetadata[] = [];

          if (index <= metadata?.fixed.length) {
            for (let currentIndex = 0; currentIndex < metadata.fixed.length; currentIndex += 1) {
              if (currentIndex === (index - 1)) {
                updatedFixedMetadata.push(data);
              } else {
                updatedFixedMetadata.push({ ...oldValues[currentIndex] });
              }
            }
          } else {
            updatedFixedMetadata.push(...oldValues);

            updatedFixedMetadata.push(data);
          }

          await this.editor.element.setProp('metadata', {
            fixed: updatedFixedMetadata,
            variable: [],
          });
        } else {
          await this.editor.element.setProp('metadata', {
            fixed: [data],
            variable: [],
          });
        }

        this.editor.graph.notSaved();
      }
    }
  }

  public addLink(blockIndex: number) {
    if (!this.data.totalLinks[blockIndex]) {
      this.data.totalLinks[blockIndex] = 1;
    } else {
      this.data.totalLinks[blockIndex] += 1;
    }
  }
}

export default Metadata;
