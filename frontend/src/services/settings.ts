import { reactive } from 'vue';

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
}

export default Settings;
