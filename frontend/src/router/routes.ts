import { RouteRecordRaw } from 'vue-router';
import Account from './routes/account';
import Home from './routes/home';
import Users from './routes/users';
import FlowchartCategories from './routes/flowchart_categories';
import Flowcharts from './routes/flowcharts';
import Editor from './routes/editor';

const routes: RouteRecordRaw[] = [
  ...Account,
  ...Home,
  ...Users,
  ...FlowchartCategories,
  ...Flowcharts,
  ...Editor,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
