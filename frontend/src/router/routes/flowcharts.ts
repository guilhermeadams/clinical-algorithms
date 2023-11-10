export const FLOWCHARTS_INDEX = 'flowcharts';
export const FLOWCHARTS_EDITOR = 'editor';

const routes = [
  {
    name: FLOWCHARTS_INDEX,
    path: '',
    component: () => import('pages/flowcharts/flowcharts-page.vue'),
  },
  {
    name: FLOWCHARTS_EDITOR,
    path: `${FLOWCHARTS_EDITOR}`,
    component: () => import('pages/flowcharts/editor-page.vue'),
  },
];

export default routes;
