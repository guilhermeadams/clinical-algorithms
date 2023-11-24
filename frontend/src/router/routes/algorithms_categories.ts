import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/algorithms-categories',
    component: () => import('layouts/main-layout.vue'),
    children: [{ path: '', component: () => import('pages/home/home-page.vue') }],
  },
];

export default routes;
