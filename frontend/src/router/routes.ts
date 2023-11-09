import { RouteRecordRaw } from 'vue-router';
import Account, { ACCOUNT } from './routes/account';
import Home from './routes/home';
import Users, { USERS_INDEX } from './routes/users';
import Flowcharts, { FLOWCHARTS_INDEX } from './routes/flowcharts';
// import FlowchartCategories from './routes/flowchart_categories';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('layouts/main-layout.vue'),
    children: [
      ...Home,
    ],
  },
  {
    path: `/${ACCOUNT}`,
    component: () => import('layouts/login-layout.vue'),
    children: [
      ...Account,
    ],
  },
  {
    path: `/${USERS_INDEX}`,
    component: () => import('layouts/main-layout.vue'),
    children: [
      ...Users,
    ],
  },
  {
    path: `/${FLOWCHARTS_INDEX}`,
    component: () => import('layouts/main-layout.vue'),
    children: [
      ...Flowcharts,
    ],
  },
];

export default routes;
