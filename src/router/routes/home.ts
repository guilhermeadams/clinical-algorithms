import { RouteRecordRaw } from 'vue-router';

export const HOME = 'home';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/main-layout.vue'),
    children: [{
      name: HOME,
      path: '',
      component: () => import('pages/home/home-page.vue'),
    }],
  },
];

export default routes;
