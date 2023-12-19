export const USERS_INDEX = 'users';

const routes = [
  {
    path: `/admin/${USERS_INDEX}`,
    name: USERS_INDEX,
    component: () => import('pages/users/users-page.vue'),
  },
];

export default routes;
