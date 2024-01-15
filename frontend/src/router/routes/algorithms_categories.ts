import { RouteRecordRaw } from 'vue-router';

export const ALGORITHMS_CATEGORIES_INDEX = 'algorithms-categories-index';

const routes: RouteRecordRaw[] = [
  {
    path: '/admin/categories',
    name: ALGORITHMS_CATEGORIES_INDEX,
    component: () => import('pages/algorithm/algorithms-categories-page.vue'),
  },
];

export default routes;
