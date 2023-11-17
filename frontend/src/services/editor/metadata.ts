import Editor from 'src/services/editor/index';
import { dia } from 'jointjs';
import { reactive, ref } from 'vue';

export interface IFixedMetadataLink {
  index: number,
  url: string,
  type: string,
}

export interface IFixedMetadata {
  index: number,
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
  links: IFixedMetadataLink[],
}

class Metadata {
  editor: Editor;

  data: {
    mountingComponent: boolean,
    loadingBlocks: boolean,
    totalBlocks: number,
    totalLinks: { [key: number]: number },
    showPanel: boolean,
  } = reactive({
      mountingComponent: true,
      loadingBlocks: false,
      totalBlocks: 0,
      totalLinks: {},
      showPanel: false,
    });

  constructor(editor: Editor) {
    this.editor = editor;
  }

  public clearMetadata() {
    this.data.mountingComponent = true;
    this.data.totalLinks = {};
    this.data.totalBlocks = 0;
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

  get fixed() {
    return {
      removeBlock: async (index: number) => {
        this.data.loadingBlocks = true;

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

            let newIndex = 1;

            for (let currentIndex = 0; currentIndex < oldItems.length; currentIndex += 1) {
              if (currentIndex !== (index - 1)) {
                updatedFixedMetadata.push({
                  ...oldItems[currentIndex],
                  index: newIndex,
                });

                newIndex += 1;
              }
            }

            await this.editor.element.setProp('metadata', {
              fixed: updatedFixedMetadata,
              variable: [],
            });

            this.data.totalBlocks = updatedFixedMetadata.length;
          }
        }

        setTimeout(() => {
          this.data.loadingBlocks = false;
        }, 1000);
      },
      get: (element: dia.Element | undefined = undefined) => {
        if (element) {
          const prop = element.prop('props/metadata') as {
            fixed: IFixedMetadata[]
          };

          return prop.fixed || undefined;
        }

        const selectedElement = this.editor.element.getSelected();

        if (selectedElement) {
          const prop = selectedElement.prop('props/metadata') as {
            fixed: IFixedMetadata[]
          };

          return prop.fixed || undefined;
        }

        return undefined;
      },
      set: async (index: number, data: IFixedMetadata) => {
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
                for (
                  let currentIndex = 0;
                  currentIndex < metadata.fixed.length;
                  currentIndex += 1
                ) {
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
      },
      setTotalLinksInBlock: (blockIndex: number) => {
        const metadata = this.getFromElement();

        // already has fixed metadata
        if (
          metadata
          && metadata.fixed
          && metadata.fixed.length
        ) {
          const { fixed } = metadata;

          if (fixed && fixed.length && fixed[blockIndex - 1]) {
            this.data.totalLinks[blockIndex] = fixed[blockIndex - 1].links.length;
          }
        }
      },
      getLinks: (blockIndex: number, linkIndex: number) => {
        const selectedElement = this.editor.element.getSelected();

        if (selectedElement) {
          const metadata = this.getFromElement(selectedElement);

          // already has fixed metadata
          if (
            metadata
            && metadata.fixed
            && metadata.fixed.length
          ) {
            const { fixed } = metadata;

            if (fixed && fixed.length) {
              return fixed[blockIndex - 1].links[linkIndex - 1];
            }
          }
        }

        return undefined;
      },
      saveLink: async (params: {
        blockIndex: number,
        linkIndex: number,
        url: string,
        type: string,
      }) => {
        const selectedElement = this.editor.element.getSelected();

        if (selectedElement) {
          const metadata = this.getFromElement(selectedElement);

          // has fixed metadata?
          if (
            metadata
            && metadata.fixed
            && metadata.fixed.length
          ) {
            // has block
            if (metadata.fixed[params.blockIndex - 1]) {
              // has a link in this index?
              if (
                metadata.fixed[params.blockIndex - 1].links.length
                && metadata.fixed[params.blockIndex - 1].links[params.linkIndex - 1]
              ) {
                // update the current link in block
                void this.editor.element.setProp(
                  `metadata/fixed/${params.blockIndex - 1}/links/${params.linkIndex - 1}`,
                  {
                    index: params.linkIndex,
                    url: params.url,
                    type: params.type,
                  },
                );
              } else if (
                metadata.fixed[params.blockIndex - 1].links.length
              ) {
                // add link in the block
                const updatedFixedMetadata = {
                  ...metadata.fixed[params.blockIndex - 1],
                  links: [
                    ...metadata.fixed[params.blockIndex - 1].links,
                    {
                      index: params.linkIndex,
                      url: params.url,
                      type: params.type,
                    },
                  ],
                };

                void this.fixed.set(params.blockIndex, updatedFixedMetadata);
              } else { // will insert the very first link in the block
                // insert new link in the block
                const updatedFixedMetadata = {
                  ...metadata.fixed[params.blockIndex - 1],
                  links: [{
                    index: params.linkIndex,
                    url: params.url,
                    type: params.type,
                  }],
                };

                void this.fixed.set(params.blockIndex, updatedFixedMetadata);
              }
            }
          }
        }
      },
    };
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