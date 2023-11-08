export const FLOWCHARTS_INDEX = 'flowcharts';

const routes = [
  {
    name: FLOWCHARTS_INDEX,
    path: '',
    component: () => import('pages/flowcharts/flowcharts-page.vue'),
  },
];

export default routes;
