export const USERS_INDEX = 'users';

const routes = [
  {
    name: USERS_INDEX,
    path: '',
    component: () => import('pages/users/users-page.vue'),
  },
];

export default routes;
