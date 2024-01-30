<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="showMenuButton"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ settings.page.title }}
        </q-toolbar-title>

        <div></div>
        <q-btn
          dense
          round
          data-testid="user_menu"
        >
          <q-avatar
            size="md"
            text-color="grey-4"
          >
            <q-icon name="person" />
          </q-avatar>

          <q-menu
            style="width:300px"
            class="q-pa-md"
          >
            <div>Registrado: {{ userName }} {{ isMaster ? '(Master)' : '' }}</div>

            <q-list class="q-mt-md text-primary">
              <q-item
                clickable
                v-ripple
                @click="logout"
              >
                <q-item-section>Salir</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="showMenuButton"
      v-model="settings.page.mainMenu"
      show-if-above
      bordered
      class="bg-secondary"
    >
      <main-menu />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeMount,
  inject,
  ref,
} from 'vue';

import { useRoute } from 'vue-router';

import Settings from 'src/services/settings';
import MainMenu from 'components/menus/main-menu.vue';
import { ALGORITHMS_EDITOR, ALGORITHMS_PUBLIC_EDITOR, ALGORITHMS_PUBLIC_SEARCH } from 'src/router/routes/algorithms';
import { LocalStorage } from 'quasar';

const route = useRoute();

const settings = inject('settings') as Settings;

const isMaster = ref(false);

const userName = computed(() => LocalStorage.getItem('user_name'));

const toggleLeftDrawer = () => {
  settings.page.mainMenu = !settings.page.mainMenu;
};

const showMenuButton = computed(
  () => ![
    ALGORITHMS_EDITOR,
    ALGORITHMS_PUBLIC_SEARCH,
    ALGORITHMS_PUBLIC_EDITOR,
  ].includes(String(route.name)),
);

const logout = () => {
  LocalStorage.remove('token');
  LocalStorage.remove('user');
  LocalStorage.remove('user_name');

  window.location.reload();
};

onBeforeMount(async () => {
  isMaster.value = await settings.isMaster();
});
</script>
