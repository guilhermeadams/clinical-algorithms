import { USERS_INDEX } from 'src/router/routes/users';
import { FLOWCHARTS_INDEX } from 'src/router/routes/flowcharts';

const sections = [
  {
    name: 'Cadastros básicos',
    items: [
      {
        name: USERS_INDEX,
        label: 'Usuários',
      },
    ],
  },
  {
    name: 'Fluxogramas',
    items: [
      {
        name: FLOWCHARTS_INDEX,
        label: 'Manutenção',
      },
    ],
  },
];

export default sections;
