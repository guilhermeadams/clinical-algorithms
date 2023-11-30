import { USERS_INDEX } from 'src/router/routes/users';
import { FLOWCHARTS_INDEX, FLOWCHARTS_SEARCH } from 'src/router/routes/algorithms';

export interface IMainMenuSection {
  name: string,
  items: {
    name: string,
    label: string,
  }[],
}

const sections: IMainMenuSection[] = [
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
      {
        name: FLOWCHARTS_SEARCH,
        label: 'Búsqueda y publicación',
      },
    ],
  },
];

export default sections;
