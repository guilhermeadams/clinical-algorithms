import * as joint from 'jointjs';

export enum CustomElement {
  START = 'Start',
  ACTION = 'Action',
  EVALUATION = 'Evaluation',
  END = 'End',
  LINK = 'Link',
  CARD = 'CardExample',
}

export const elementName: {
  [key: string]: string,
} = {
  [CustomElement.START]: 'Início',
  [CustomElement.ACTION]: 'Ação',
  [CustomElement.EVALUATION]: 'Avaliação',
  [CustomElement.END]: 'Fim',
  [CustomElement.LINK]: 'Link',
  [CustomElement.CARD]: 'Card interativo',
};

export const PORT = {
  attrs: {
    body: {
      magnet: true,
      width: 10,
      height: 10,
      x: 0,
      y: 0,
      rx: 5,
      ry: 5,
      fill: 'grey',
    },
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
  ],
};

const customElements = {
  [CustomElement.LINK]: joint.dia.Link.define(CustomElement.LINK, {
    connector: { name: 'rounded' },
    router: { name: 'manhattan' },
    attrs: {
      line: {
        connection: true,
        stroke: 'grey',
        strokeWidth: 2,
        targetAnchor: {},
        targetMarker: {
          stroke: 'none',
          strokeWidth: 0,
          type: 'path',
          fill: 'grey',
          d: 'M 10 -10 -2 0 10 10 Z',
        },
      },
    },
  }, {
    markup: [{
      tagName: 'path',
      selector: 'line',
      attributes: {
        fill: 'none',
        pointerEvents: 'none',
      },
    }],
  }),

  [CustomElement.START]: joint.dia.Element.define(CustomElement.START, {
    attrs: {
      body: {
        width: 'calc(w)',
        height: 'calc(h)',
        rx: 25,
        ry: 25,
        fill: 'white',
        stroke: '#21BA45',
        strokeWidth: 3,
      },
    },
  }, {
    markup: [{
      tagName: 'rect',
      selector: 'body',
    }, {
      tagName: 'text',
      selector: 'label',
    }, {
      tagName: 'path',
      selector: 'icon',
    }],
  }),

  [CustomElement.ACTION]: joint.dia.Element.define(CustomElement.ACTION, {
    attrs: {
      foreignObject: {
        width: 'calc(w)',
        height: 'calc(h)',
      },
    },
  }, {
    markup: joint.util.svg/* xml */`
      <foreignObject @selector="foreignObject">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          class="editor-action-element"
        >
          <div class="element-textarea-container">
            <textarea
              @selector="elementLabel"
              class="element-textarea-input"
              autocomplete="off"
              placeholder="Ação"
              contenteditable="true"
              maxlength="70"
              spellcheck="false"
              rows="1"
            ></textarea>
          </div>
        </div>
      </foreignObject>
    `,
  }),

  // OLD ACTION (without editing text inside element)
  // [Element.ACTION]: joint.dia.Element.define(Element.ACTION, {
  //   size: {
  //     width: 50,
  //     height: 50,
  //   },
  //   attrs: {
  //     body: {
  //       width: 'calc(w)',
  //       height: 'calc(h)',
  //       fill: '#FFFFFF',
  //       stroke: '#0099FF',
  //       strokeWidth: 3,
  //       rx: 5,
  //       ry: 5,
  //     },
  //     label: {
  //       textVerticalAnchor: 'middle',
  //       textAnchor: 'middle',
  //       x: 'calc(0.5*w)',
  //       y: 'calc(0.5*h)',
  //       fontSize: 14,
  //       fill: '#0099FF',
  //       text: 'Ação',
  //     },
  //   },
  // }, {
  //   markup: [{
  //     tagName: 'rect',
  //     selector: 'body',
  //   }, {
  //     tagName: 'text',
  //     selector: 'label',
  //   }, {
  //     tagName: 'path',
  //     selector: 'icon',
  //   }],
  // }),

  [CustomElement.EVALUATION]: joint.dia.Element.define(CustomElement.EVALUATION, {
    size: {
      width: 50,
      height: 50,
    },
    attrs: {
      body: {
        width: 'calc(w)',
        height: 'calc(h)',
        fill: 'transparent',
        strokeWidth: 0,
        rx: 5,
        ry: 5,
      },
      polygon: {
        fill: 'white',
        stroke: '#dabf5e',
        strokeWidth: 3,
        d: 'm 32 0 l 136.4099 -0 l 30.1486 48.7612 l -30.1486 48.7612 l -136.4099 0 l -30.1486 -48.7612 z',
      },
      label: {
        textVerticalAnchor: 'middle',
        textAnchor: 'middle',
        x: 'calc(0.5*w)',
        y: 'calc(0.5*h)',
        fontSize: 14,
        fill: '#dabf5e',
        text: 'Avaliação',
      },
    },
  }, {
    markup: [{
      tagName: 'rect',
      selector: 'body',
    }, {
      tagName: 'path',
      selector: 'polygon',
    }, {
      tagName: 'text',
      selector: 'label',
    }],
  }),

  [CustomElement.END]: joint.dia.Element.define(CustomElement.END, {
    size: {
      width: 50,
      height: 50,
    },
    attrs: {
      body: {
        width: 50,
        height: 50,
        rx: 25,
        ry: 25,
        fill: 'white',
        stroke: '#FF0000',
        strokeWidth: 3,
      },
    },
  }, {
    markup: [{
      tagName: 'rect',
      selector: 'body',
    }, {
      tagName: 'text',
      selector: 'label',
    }, {
      tagName: 'path',
      selector: 'icon',
    }],
  }),
};

export default customElements;