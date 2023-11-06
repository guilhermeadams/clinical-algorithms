import { RouteRecordRaw } from 'vue-router';

export const ACCOUNT_LOGIN = 'login';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('layouts/login-layout.vue'),
    children: [{
      name: ACCOUNT_LOGIN,
      path: `account/${ACCOUNT_LOGIN}`,
      component: () => import('pages/account/login-page.vue'),
    }],
  },
];

export default routes;
