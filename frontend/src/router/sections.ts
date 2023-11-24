import { USERS_INDEX } from 'src/router/routes/users';
import { FLOWCHARTS_INDEX } from 'src/router/routes/algorithms';

const sections = [
  {
    name: 'Registros básicos',
    items: [
      {
        name: USERS_INDEX,
        label: 'Usuarios',
      },
    ],
  },
  {
    name: 'Algoritmos',
    items: [
      {
        name: FLOWCHARTS_INDEX,
        label: 'Mantenimiento',
      },
    ],
  },
];

export default sections;
