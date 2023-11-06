import { RouteRecordRaw } from 'vue-router';

export const USERS_INDEX = 'users';

const routes: RouteRecordRaw[] = [
  {
    path: `/${USERS_INDEX}`,
    component: () => import('layouts/main-layout.vue'),
    children: [
      {
        name: USERS_INDEX,
        path: '',
        component: () => import('pages/users/users-page.vue'),
      }],
  },
];

export default routes;
