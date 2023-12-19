import { reactive } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { ALGORITHMS_PUBLIC_EDITOR, ALGORITHMS_PUBLIC_SEARCH } from 'src/router/routes/algorithms';

class Settings {
  private appName = 'PAHO';

  private route: RouteLocationNormalizedLoaded;

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

  constructor(options: { route: RouteLocationNormalizedLoaded }) {
    this.route = options.route;
  }

  get isPublicView() {
    return [
      ALGORITHMS_PUBLIC_SEARCH,
      ALGORITHMS_PUBLIC_EDITOR,
    ].includes(
      String(this.route.name),
    );
  }
}

export default Settings;
