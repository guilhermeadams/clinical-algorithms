export const HOME = 'home';

const routes = [
  {
    path: `/admin/${HOME}`,
    name: HOME,
    component: () => import('pages/home/home-page.vue'),
  },
];

export default routes;
