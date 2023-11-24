export const FLOWCHARTS_INDEX = 'algorithms';
export const FLOWCHARTS_EDITOR = 'editor';

const routes = [
  {
    name: FLOWCHARTS_INDEX,
    path: '',
    component: () => import('pages/algorithm/algorithms-page.vue'),
  },
  {
    name: FLOWCHARTS_EDITOR,
    path: `${FLOWCHARTS_EDITOR}`,
    component: () => import('pages/algorithm/editor-page.vue'),
  },
];

export default routes;
