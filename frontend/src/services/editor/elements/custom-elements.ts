import * as joint from 'jointjs';
import { IFixedMetadata } from 'src/services/editor/constants/metadata';
import { recommendationArrowsLine } from 'src/services/recommendations';

export enum CustomElement {
  START = 'StartElement',
  ACTION = 'ActionElement',
  EVALUATION = 'EvaluationElement',
  RECOMMENDATION = 'RecommendationElement',
  RECOMMENDATION_TOTAL = 'RecommendationTotalElement',
  END = 'EndElement',
  LINK = 'LinkElement',
  // CARD = 'ElementCardExample',
  LANE = 'LaneElement',
}

export const elementName: {
  [key: string]: string,
} = {
  [CustomElement.START]: 'Start',
  [CustomElement.ACTION]: 'Action',
  [CustomElement.EVALUATION]: 'Evaluation',
  [CustomElement.RECOMMENDATION]: 'Recommendation',
  [CustomElement.RECOMMENDATION_TOTAL]: 'RecommendationTotal',
  [CustomElement.END]: 'End',
  [CustomElement.LINK]: 'Link',
  [CustomElement.LANE]: 'Time',
};

export const ROUND_PORT = {
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
  ],
  attrs: {
    body: {
      magnet: true,
      width: 11,
      height: 11,
      x: 0,
      y: 0,
      fill: '#21BA45',
      rx: 6,
      ry: 6,
    },
  },
};

export const ACTION_PORT = {
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
  ],
  attrs: {
    body: {
      magnet: true,
      width: 200,
      height: 11,
      x: 0,
      y: 0,
      fill: '#0089Ef',
      rx: 5,
      ry: 5,
    },
  },
};

export const EVALUATION_PORT = {
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
  ],
  attrs: {
    body: {
      magnet: true,
      width: 136,
      height: 11,
      x: 0,
      y: 0,
      fill: '#DABF5E',
      rx: 5,
      ry: 5,
    },
  },
};

export const TEXTAREA_CLASSNAME = 'element-textarea-input';

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

  [CustomElement.RECOMMENDATION]: (recommendations: IFixedMetadata[]) => {
    let items = '';

    // only the 3 first recommendations
    for (const recommendation of recommendations) {
      items += `<div class="row bg-white" data-index="${recommendation.index}">${recommendationArrowsLine(recommendation)}</div>`;
    }

    return joint.dia.Element.define(CustomElement.RECOMMENDATION, {
      attrs: {
        foreignObject: {
          width: 'calc(w)',
          height: 'calc(h)',
        },
      },
    }, {
      markup: joint.util.svg/* xml */`
      <foreignObject
        @selector="foreignObject"
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          class="recommendation-element"
        >
          <div class="text-caption">
            ${items}
          </div>
        </div>
      </foreignObject>
    `,
    });
  },

  [CustomElement.RECOMMENDATION_TOTAL]: joint.dia.Element.define(
    CustomElement.RECOMMENDATION_TOTAL,
    {
      attrs: {
        body: {
          width: 'calc(w)',
          height: 'calc(h)',
          strokeWidth: 0,
          // stroke: '#000000',
          fill: '#445566',
          rx: 2,
          ry: 2,
        },
        label: {
          textVerticalAnchor: 'middle',
          textAnchor: 'middle',
          x: 'calc(0.5*w)',
          y: 'calc(0.55*h)',
          fontSize: 12,
          fontFamily: 'Courier New, sans-serif',
          fill: 'white',
          text: '1RF',
        },
      },
    },
    {
      markup: [{
        tagName: 'rect',
        selector: 'body',
      }, {
        tagName: 'text',
        selector: 'label',
      }],
    },
  ),

  [CustomElement.ACTION]: joint.dia.Element.define(CustomElement.ACTION, {
    attrs: {
      foreignObject: {
        width: 'calc(w)',
        height: 'calc(h)',
      },
    },
  }, {
    markup: joint.util.svg/* xml */`
      <foreignObject
        @selector="foreignObject"
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          class="editor-action-element"
        >
          <div class="element-textarea-container">
            <!--<input
              class="${TEXTAREA_CLASSNAME}"
              placeholder="Acción"
              contenteditable="true"
              maxlength="70"
              spellcheck="false"
            />-->
            <textarea
              class="${TEXTAREA_CLASSNAME}"
              autocomplete="off"
              placeholder="Ação"
              contenteditable="true"
              maxlength="60"
              spellcheck="false"
              rows="1"
              @selector="elementLabel"
            ></textarea>
          </div>
        </div>
      </foreignObject>
    `,
  }),

  [CustomElement.EVALUATION]: joint.dia.Element.define(CustomElement.EVALUATION, {
    attrs: {
      foreignObject: {
        width: 'calc(w)',
        height: 'calc(h)',
      },
    },
  }, {
    markup: joint.util.svg/* xml */`
      <foreignObject
        @selector="foreignObject"
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          class="editor-evaluation-element"
        >
          <div>
            <textarea
              class="${TEXTAREA_CLASSNAME}"
              autocomplete="off"
              placeholder="Evaluación"
              contenteditable="true"
              maxlength="60"
              spellcheck="false"
              rows="1"
              @selector="elementLabel"
            ></textarea>
          </div>
        </div>
      </foreignObject>
    `,
  }),

  [CustomElement.LANE]: joint.dia.Element.define(CustomElement.LANE, {
    attrs: {
      foreignObject: {
        width: 'calc(w)',
        height: 'calc(h)',
      },
    },
  }, {
    markup: joint.util.svg/* xml */`
      <foreignObject
        @selector="foreignObject"
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          class="editor-lane-element"
        >
          <div
            style="cursor:move"
          >
            <div
              style="height:20px;border-bottom:2px solid #777777;margin-top:30px"
            >
            </div>
            <input
              class="${TEXTAREA_CLASSNAME}"
              placeholder="Título"
              contenteditable="true"
              maxlength="60"
              spellcheck="false"
              style="width:530px"
            />
          </div>
        </div>
      </foreignObject>
    `,
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
