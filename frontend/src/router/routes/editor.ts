export const EDITOR = 'editor';

const routes = [
  {
    name: EDITOR,
    path: `${EDITOR}`,
    component: () => import('pages/editor/editor-page.vue'),
  },
];

export default routes;
