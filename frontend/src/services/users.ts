import { reactive } from 'vue';
import { api } from 'boot/axios';

const emptyUser = {
  id: 0,
  name: '',
  email: '',
  password: '',
  phone: '',
  maintainer: false,
  master: false,
  updatedAt: '',
};

export interface IUser {
  id?: number,
  name: string,
  email: string,
  password: string,
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
    this.data.users = [];
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

    // hide original password hash
    this.data.user.password = '';

    // convert 0 / 1 to false / true
    this.data.user.maintainer = !!this.data.user.maintainer;
    this.data.user.master = !!this.data.user.master;

    this.toggleEditDialog();
  }

  public async get() {
    try {
      const { data } = await api.get('users');

      this.data.users = [...data];

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async create() {
    try {
      this.data.loading = true;

      await api.post('users', {
        ...this.data.user,
      });

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      this.toggleEditDialog();

      this.data.loading = false;
    }
  }

  public async update() {
    try {
      this.data.loading = true;

      await api.put('users', {
        ...this.data.user,
      });

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      this.toggleEditDialog();

      this.data.loading = false;
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
