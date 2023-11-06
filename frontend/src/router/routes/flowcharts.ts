import { RouteRecordRaw } from 'vue-router';

export const FLOWCHARTS_INDEX = 'flowcharts';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('layouts/main-layout.vue'),
    children: [{
      name: FLOWCHARTS_INDEX,
      path: `/${FLOWCHARTS_INDEX}`,
      component: () => import('pages/flowcharts/flowcharts-page.vue'),
    }],
  },
];

export default routes;
