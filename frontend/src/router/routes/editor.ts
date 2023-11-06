import { RouteRecordRaw } from 'vue-router';

export const EDITOR = 'editor';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('layouts/main-layout.vue'),
    children: [{
      name: EDITOR,
      path: `/${EDITOR}`,
      component: () => import('pages/editor/editor-page.vue'),
    }],
  },
];

export default routes;
