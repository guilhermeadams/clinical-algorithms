import { reactive } from 'vue';

const usersMock = [
  {
    id: 1,
    name: 'Gabriel Silveira',
    email: 'gabriel@gabrielsilveira.com.br',
    phone: '(11) 97676-8736',
    maintainer: true,
    master: false,
    updatedAt: '23-10-2023 às 14:21h',
  },
  {
    id: 2,
    name: 'Roberto Rizzo',
    email: 'robertopinarizzo@verx.com.br',
    phone: '(11) 99917-5174',
    maintainer: true,
    master: true,
    updatedAt: '22-10-2023 às 09:56h',
  },
];

const emptyUser = {
  id: 0,
  name: '',
  email: '',
  phone: '',
  maintainer: false,
  master: false,
  updatedAt: '',
};

export interface IUser {
  id?: number,
  name: string,
  email: string,
  phone: string,
  maintainer: boolean,
  master: boolean,
  updatedAt: string,
}

class Users {
  data: {
    loading: boolean,
    showEditDialog: boolean,
    users: IUser[],
    user: IUser,
    searchResults: IUser[] | null,
  } = reactive({
      loading: false,
      showEditDialog: false,
      users: [],
      user: { ...emptyUser },
      searchResults: null,
    });

  constructor() {
    this.data.users = [...usersMock];
  }

  get usersList() {
    return this.data.searchResults && this.data.searchResults.length
      ? this.data.searchResults : this.data.users;
  }

  public search(keyword: string) {
    try {
      this.data.loading = true;

      this.data.searchResults = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const user of this.data.users) {
        if (user.name.toLowerCase().includes(keyword.toLowerCase())) {
          this.data.searchResults.push(user);
        }
      }

      return Promise.resolve(this.data.searchResults);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setTimeout(() => {
        this.data.loading = false;
      }, 1000);
    }
  }

  public startCreatingUser() {
    this.data.user = { ...emptyUser };

    this.toggleEditDialog();
  }

  public editUser(user: IUser) {
    this.data.user = { ...user };

    this.toggleEditDialog();
  }

  public save() {
    try {
      this.data.loading = true;

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      this.toggleEditDialog();

      setTimeout(() => {
        if (this.data.user.id) {
          // update user
        } else {
          // insert user
          this.data.users.unshift({
            ...this.data.user,
            id: 999,
            updatedAt: '24/10/2023 às 14:07h',
          });
        }

        this.data.loading = false;
      }, 1500);
    }
  }

  public delete() {
    try {
      this.data.loading = true;

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      this.toggleEditDialog();

      setTimeout(() => {
        const updatedUsers: IUser[] = [];

        // eslint-disable-next-line no-restricted-syntax
        for (const user of this.data.users) {
          if (user.id !== this.data.user.id) {
            updatedUsers.push({ ...user });
          }
        }

        this.data.users = [...updatedUsers];

        this.data.loading = false;
      }, 1500);
    }
  }

  public clearSearch() {
    this.data.searchResults = null;
  }

  public toggleEditDialog() {
    this.data.showEditDialog = !this.data.showEditDialog;
  }
}

export default Users;
