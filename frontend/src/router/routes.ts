import { RouteRecordRaw } from 'vue-router';
import Account from './routes/account';
import Home from './routes/home';
import Users from './routes/users';
import Algorithms from './routes/algorithms';
import AlgorithmsCategories from './routes/algorithms_categories';

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
      ...Algorithms,
      ...AlgorithmsCategories,
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
