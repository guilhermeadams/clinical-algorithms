import { RouteRecordRaw } from 'vue-router';
import Account from './routes/account';
import Home from './routes/home';
import Users from './routes/users';
import Flowcharts from './routes/algorithms';

const routes: RouteRecordRaw[] = [
  // {
  //   path: '',
  //   component: () => import('layouts/main-layout.vue'),
  //   children: [],
  // },
  {
    path: '',
    component: () => import('layouts/main-layout.vue'),
    children: [
      ...Home,
      ...Users,
      ...Flowcharts,
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/login-layout.vue'),
    children: [
      ...Account,
    ],
  },
];

export default routes;
