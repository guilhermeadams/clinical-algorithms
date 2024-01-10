import { USERS_INDEX } from 'src/router/routes/users';
import { ALGORITHMS_INDEX, ALGORITHMS_SEARCH } from 'src/router/routes/algorithms';
import { ALGORITHMS_CATEGORIES_INDEX } from 'src/router/routes/algorithms_categories';

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
      {
        name: ALGORITHMS_CATEGORIES_INDEX,
        label: 'Categorías',
      },
    ],
  },
  {
    name: 'Algoritmos',
    items: [
      {
        name: ALGORITHMS_INDEX,
        label: 'Mantenimiento',
      },
      {
        name: ALGORITHMS_SEARCH,
        label: 'Búsqueda y publicación',
      },
    ],
  },
];

export default sections;
