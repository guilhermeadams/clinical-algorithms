import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ACCOUNT_LOGIN } from 'src/router/routes/account';
import { LocalStorage } from 'quasar';

class Settings {
  private appName = 'PAHO';

  public page: {
    setTitle: (title?: string) => void,
    title: string,
    mainMenu: boolean,
  } = reactive({
      setTitle: (title?: string) => {
        this.page.title = `${this.appName}${title ? ` - ${title}` : ''}`;

        window.document.title = this.page.title;
      },
      title: 'PAHO',
      mainMenu: true,
    });

  constructor() {
    Settings.checkUser();
  }

  private static checkUser() {
    const token = LocalStorage.getItem('token');

    if (!token) {
      const router = useRouter();

      void router.push({
        name: ACCOUNT_LOGIN,
      });
    }
  }
}

export default Settings;
