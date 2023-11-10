export const ACCOUNT = 'account';
export const ACCOUNT_LOGIN = 'login';

const routes = [
  {
    name: ACCOUNT_LOGIN,
    path: `${ACCOUNT_LOGIN}`,
    component: () => import('pages/account/login-page.vue'),
  },
];

export default routes;
